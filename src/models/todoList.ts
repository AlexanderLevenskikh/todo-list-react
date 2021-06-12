import {
    applySnapshot,
    destroy,
    flow,
    getEnv,
    Instance,
    SnapshotIn,
    SnapshotOut,
    toGenerator,
    types,
} from 'mobx-state-tree';
import { v1 } from 'uuid';
import { ITodoListItemNode, todoListItemNode } from 'root/models/todoListItem';
import { IStoreDependencies } from 'root/stores/dependencies';
import { mappers } from 'root/models/mappers';
import { getActivePage } from 'root/shared/utils/getActivePage';
import { getPagesCount } from 'root/shared/utils/getPagesCount';
import { MIN_PAGING_LIMIT } from 'root/constants/paging';
import { Todo } from 'root/components/Todo/Todo';
import { TodoList } from 'root/components/TodoList/TodoList';

export interface ITodoListModel extends Instance<typeof todoListModel> {}
export interface ITodoListNode extends Instance<typeof todoListNode> {}
export interface ITodoListNodeSnapshotIn extends SnapshotIn<typeof todoListNode> {}
export interface ITodoListNodeSnapshotOut extends SnapshotOut<typeof todoListNode> {}

export enum TodoListCompletionFilter {
    All = 'All',
    Completed = 'Completed',
    Uncompleted = 'Uncompleted',
}

export const todoListModel = types.model('todoListModel', {
    loading: false,
    items: types.optional(types.array(todoListItemNode), []),
    count: 0,
    totalCount: 0,
    completedCount: 0,
    limit: MIN_PAGING_LIMIT,
    offset: 0,
    completionFilter: types.optional(
        types.enumeration([
            TodoListCompletionFilter.All,
            TodoListCompletionFilter.Completed,
            TodoListCompletionFilter.Uncompleted,
        ]),
        TodoListCompletionFilter.All,
    ),
});

export const todoListNode = todoListModel
    .views((self) => ({
        get activePage() {
            return getActivePage(self.offset, self.limit);
        },

        get pagesCount() {
            return getPagesCount(self.count, self.limit);
        },
    }))
    .actions((self) => {
        return {
            afterAttach() {
                this.initCounters();
            },

            changeCompletedCount(completedCount: number) {
                self.completedCount = completedCount;
            },

            changeTotalCount(totalCount: number) {
                self.totalCount = totalCount;
            },

            initCounters: flow(function* afterCreate() {
                const { api, logger } = getEnv<IStoreDependencies>(self);
                try {
                    const response = yield* toGenerator(
                        api.todoList.getList({
                            isCompleted: true,
                            limit: 0,
                            offset: 0,
                        }),
                    );
                    self.completedCount = response.count;
                } catch (e) {
                    logger.logError(e.message);
                }

                yield* load();
                self.totalCount = self.count;
            }),

            load: flow(load),

            add: flow(function* add(comment: string) {
                try {
                    const { api } = getEnv<IStoreDependencies>(self);
                    yield* toGenerator(
                        api.todoList.addItem({
                            id: v1(),
                            comment,
                            completed: false,
                        }),
                    );

                    self.totalCount += 1;
                    yield* load();
                } catch (e) {
                    getEnv<IStoreDependencies>(self).logger.logError(e.message);
                }
            }),

            remove(item: ITodoListItemNode) {
                destroy(item);
            },
        };

        function* load(args: Partial<Pick<ITodoListModel, 'limit' | 'offset' | 'completionFilter'>> = {}) {
            if (args.limit !== undefined) {
                self.limit = args.limit;
            }

            if (args.offset !== undefined) {
                self.offset = args.offset;
            }

            if (args.completionFilter !== undefined) {
                self.completionFilter = args.completionFilter;
            }

            const { api, logger } = getEnv<IStoreDependencies>(self);

            try {
                self.loading = true;

                let offset = self.offset;
                let isCompleted;
                if (self.completionFilter !== TodoListCompletionFilter.All) {
                    isCompleted = self.completionFilter === TodoListCompletionFilter.Completed;
                    offset = 0;
                }

                const response = yield* toGenerator(
                    api.todoList.getList({
                        isCompleted,
                        limit: self.limit,
                        offset,
                    }),
                );

                applySnapshot(self.items, mappers.todoList.mapDtoListToModel(response.items));
                self.count = response.count;
            } catch (e) {
                logger.logError(e.message);
            } finally {
                self.loading = false;
            }
        }
    });
