import { IApi } from 'root/api';
import { ITodoListApi } from 'root/api/interfaces/todoList';
import { TodoListFakeApi } from 'root/api/fake/todoList';

export class FakeApi implements IApi {
    todoList: ITodoListApi = new TodoListFakeApi();
}
