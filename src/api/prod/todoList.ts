import { IGetTodoListArgs, ITodoListApi } from 'root/api/interfaces/todoList';
import { ITodoListDto, ITodoListItemDto } from 'root/api/dto';
import { NotImplementedError } from 'root/shared/errors/notImplementedError';

export class TodoListApi implements ITodoListApi {
    addItem(item: ITodoListItemDto): Promise<void> {
        throw new NotImplementedError();
    }

    updateItem(item: ITodoListItemDto): Promise<void> {
        throw new NotImplementedError();
    }

    getList(params: IGetTodoListArgs): Promise<ITodoListDto> {
        throw new NotImplementedError();
    }

    removeItem(id: string): Promise<void> {
        throw new NotImplementedError();
    }
}
