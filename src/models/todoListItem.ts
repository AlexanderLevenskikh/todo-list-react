import { getEnv, getParent, Instance, SnapshotIn, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { ITodoListNode } from 'root/models/todoList';
import { flow } from 'mobx';
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
    toggleIsCompleted() {
        self.isCompleted = !self.isCompleted;
    },

    edit: flow(function* (comment: string) {
        const { api } = getEnv<IStoreDependencies>(self);
        yield* toGenerator(
            api.todoList.updateItem({
                ...mappers.todoList.mapModelToDto(self),
                comment,
            }),
        );

        self.comment = comment;
    }),

    remove: flow(function* () {
        const { api } = getEnv<IStoreDependencies>(self);
        yield* toGenerator(api.todoList.removeItem(self.id));

        getParent<ITodoListNode>(self, 2).load();
    }),
}));
