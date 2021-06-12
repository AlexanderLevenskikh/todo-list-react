import { IGetTodoListArgs, ITodoListApi } from 'root/api/interfaces/todoList';
import { ITodoListDto, ITodoListItemDto } from 'root/api/dto';
import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';

export class TodoListFakeApi implements ITodoListApi {
    addItem(item: ITodoListItemDto): Promise<void> {
        return httpClient.makeRequest({
            method: HttpClientMethod.POST,
            responseType: HttpClientResponseType.JSON,
            route: 'todoList',
            request: {
                body: {
                    id: item.id,
                    comment: item.comment,
                    completed: item.completed,
                },
            },
        });
    }

    updateItem(item: ITodoListItemDto): Promise<void> {
        return httpClient.makeRequest({
            method: HttpClientMethod.PUT,
            responseType: HttpClientResponseType.JSON,
            route: 'todoList',
            request: {
                body: {
                    id: item.id,
                    comment: item.comment,
                    completed: item.completed,
                },
            },
        });
    }

    getList(params: IGetTodoListArgs): Promise<ITodoListDto> {
        return httpClient.makeRequest({
            method: HttpClientMethod.GET,
            responseType: HttpClientResponseType.JSON,
            route: 'todoList',
            request: {
                query: {
                    ...(params.limit !== undefined ? { _limit: params.limit } : {}),
                    ...(params.offset !== undefined ? { _start: params.offset } : {}),
                    ...(params.isCompleted !== undefined ? { completed: params.isCompleted } : {}),
                },
            },
        });
    }

    removeItem(id: string): Promise<void> {
        return httpClient.makeRequest({
            method: HttpClientMethod.DELETE,
            responseType: HttpClientResponseType.JSON,
            route: `todoList/${id}`,
            request: {},
        });
    }
}
