import { getEnv, getParent, Instance, SnapshotIn, SnapshotOut, toGenerator, types, flow } from 'mobx-state-tree';
import { ITodoListNode } from 'root/models/todoList';
import { IStoreDependencies } from 'root/stores/dependencies';
import { mappers } from 'root/models/mappers';

export interface ITodoListItemModel extends Instance<typeof todoListItemModel> {}
export interface ITodoListItemNode extends Instance<typeof todoListItemNode> {}
export interface ITodoListItemNodeSnapshotIn extends SnapshotIn<typeof todoListItemNode> {}
export interface ITodoListItemNodeSnapshotOut extends SnapshotOut<typeof todoListItemNode> {}

export const todoListItemModel = types.model('todoListItemModel', {
    id: types.string,
    comment: types.string,
    isCompleted: types.boolean,
});

export const todoListItemNode = todoListItemModel.actions((self) => ({
    edit: flow(function* edit(comment: string) {
        const { api, logger } = getEnv<IStoreDependencies>(self);

        try {
            yield* toGenerator(
                api.todoList.updateItem({
                    ...mappers.todoList.mapModelToDto(self),
                    ...(comment !== undefined ? { comment } : {}),
                }),
            );

            if (comment !== undefined) {
                self.comment = comment;
            }
        } catch (e) {
            logger.logError(e.message);
        }
    }),

    toggleIsCompleted: flow(function* toggleIsCompleted() {
        const { api, logger } = getEnv<IStoreDependencies>(self);
        const nextCompleted = !self.isCompleted;

        try {
            yield* toGenerator(
                api.todoList.updateItem({
                    ...mappers.todoList.mapModelToDto(self),
                    completed: nextCompleted,
                }),
            );

            const parent = getParent<ITodoListNode>(self, 2);
            parent.changeCompletedCount(parent.completedCount + (nextCompleted ? 1 : -1));
            parent.load();
        } catch (e) {
            logger.logError(e.message);
        }
    }),

    remove: flow(function* () {
        const { api, logger, notifier } = getEnv<IStoreDependencies>(self);

        try {
            const { isCompleted, comment } = self;
            yield* toGenerator(api.todoList.removeItem(self.id));

            notifier.notifySuccess(`TODO "${comment}" was removed`);

            const parent = getParent<ITodoListNode>(self, 2);
            if (isCompleted) {
                parent.changeCompletedCount(parent.completedCount - 1);
            }
            parent.changeTotalCount(parent.totalCount - 1);
            parent.load();
        } catch (e) {
            logger.logError(e.message);
        }
    }),
}));
