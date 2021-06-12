import { IApi } from 'root/api';
import { ITodoListApi } from 'root/api/interfaces/todoList';
import { TodoListApi } from 'root/api/prod/todoList';

export class Api implements IApi {
    todoList: ITodoListApi = new TodoListApi();
}
