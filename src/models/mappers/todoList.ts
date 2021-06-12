import { ITodoListItemModel } from 'root/models/todoListItem';
import { ITodoListItemDto } from 'root/api/dto';
import { StrictMapper } from 'root/models/mappers/index';
import { morphism } from 'morphism';

export class TodoListMapper {
    mapDtoToModel = (source: ITodoListItemDto) => morphism(this.dtoToModelSchema, source);
    mapDtoListToModel = (source: ITodoListItemDto[]) => morphism(this.dtoToModelSchema, source);
    mapModelToDto = (source: ITodoListItemModel) => morphism(this.modelToDtoSchema, source);
    mapModelListToDto = (source: ITodoListItemModel[]) => morphism(this.modelToDtoSchema, source);

    private dtoToModelSchema: StrictMapper<ITodoListItemModel, ITodoListItemDto> = {
        id: 'id',
        comment: 'comment',
        isCompleted: 'completed',
    };

    private modelToDtoSchema: StrictMapper<ITodoListItemDto, ITodoListItemModel> = {
        id: 'id',
        comment: 'comment',
        completed: 'isCompleted',
    };
}
