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

export interface ITodoListModel extends Instance<typeof todoListModel> {}
export interface ITodoListNode extends Instance<typeof todoListNode> {}
export interface ITodoListNodeSnapshotIn extends SnapshotIn<typeof todoListNode> {}
export interface ITodoListNodeSnapshotOut extends SnapshotOut<typeof todoListNode> {}

export const todoListModel = types.model('todoListModel', {
    loading: false,
    items: types.optional(types.array(todoListItemNode), []),
    totalCount: 0,
    limit: 5,
    offset: 0,
    filterCompleted: types.maybe(types.boolean),
});

export const todoListNode = todoListModel
    .views((self) => ({
        get completedCount() {
            return self.items.filter((x) => x.isCompleted).length;
        },

        get currentCount() {
            return self.items.filter((x) => !x.isCompleted).length;
        },

        get completedItems() {
            return self.items.filter((x) => x.isCompleted);
        },

        get currentItems() {
            return self.items.filter((x) => !x.isCompleted);
        },
    }))
    .actions((self) => ({
        load: flow(function* load() {
            try {
                self.loading = true;

                const { api } = getEnv<IStoreDependencies>(self);
                const response = yield* toGenerator(
                    api.todoList.getList({
                        isCompleted: self.filterCompleted,
                        limit: self.limit,
                        offset: self.offset,
                    }),
                );

                applySnapshot(self.items, mappers.todoList.mapDtoListToModel(response.items));
                self.totalCount = response.totalCount;
            } catch (e) {
                getEnv<IStoreDependencies>(self).logger.logError(e.message);
            } finally {
                self.loading = false;
            }
        }),

        add(comment: string) {
            self.items.push({
                id: v1(),
                comment,
                isCompleted: false,
            });
        },

        remove(item: ITodoListItemNode) {
            destroy(item);
        },
    }));
