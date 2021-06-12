import { StrictSchema } from 'morphism';
import { TodoListMapper } from 'root/models/mappers/todoList';

export type StrictMapper<Destination, Source> = { [x in keyof Destination]: keyof Source } &
    StrictSchema<Destination, Source>;

export const mappers = {
    todoList: new TodoListMapper(),
};
