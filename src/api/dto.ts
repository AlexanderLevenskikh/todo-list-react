export interface IListDto<T> {
    items: T[];
    totalCount: number;
}

export interface ITodoListItemDto {
    id: string;
    comment: string;
    completed: boolean;
}

export interface ITodoListDto extends IListDto<ITodoListItemDto> {}
