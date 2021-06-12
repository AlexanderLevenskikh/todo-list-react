import { ITodoListDto, ITodoListItemDto } from 'root/api/dto';

export interface IGetTodoListArgs {
    limit?: number;
    offset?: number;
    isCompleted?: boolean;
}

export interface ITodoListApi {
    getList(params: IGetTodoListArgs): Promise<ITodoListDto>;
    addItem(item: ITodoListItemDto): Promise<void>;
    updateItem(item: ITodoListItemDto): Promise<void>;
    removeItem(id: string): Promise<void>;
}
