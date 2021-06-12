import React, { FC, SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { useMst } from 'root/stores/react/useMst';
import { TodoListCompletionFilter } from 'root/models/todoList';

export const TodoListFilter: FC = observer(() => {
    const { todoList } = useMst();

    return (
        <div>
            <select onChange={changeCompletionFilter} value={todoList.completionFilter}>
                <option value={TodoListCompletionFilter.All}>All</option>
                <option value={TodoListCompletionFilter.Completed}>Completed</option>
                <option value={TodoListCompletionFilter.Uncompleted}>Uncompleted</option>
            </select>
        </div>
    );

    function changeCompletionFilter(event: SyntheticEvent<HTMLSelectElement>) {
        todoList.load({
            completionFilter: event.currentTarget.value as TodoListCompletionFilter,
        });
    }
});
