import { Instance, types } from 'mobx-state-tree';
import { todoListNode } from 'root/models/todoList';
import { StoreDependencies } from 'root/stores/dependencies/prod';
import { FakeStoreDependencies } from 'root/stores/dependencies/fake';

export interface StoreModel extends Instance<typeof storeModel> {}

const storeModel = types.model('storeModel', {
    todoList: todoListNode,
});

let initialState = storeModel.create(
    {
        todoList: todoListNode.create(),
    },
    IS_PROD_DEPS ? new StoreDependencies() : new FakeStoreDependencies(),
);

export const store = initialState;
