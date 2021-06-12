import React from 'react';
import { FC } from 'react';
import { TodoListEntry } from 'root/components/TodoListEntry/TodoListEntry';
import { TodoList } from 'root/components/TodoList/TodoList';
import { TodoListFilter } from 'root/components/TodoListFilter/TodoListFilter';

export const Todo: FC = () => {
    return (
        <div>
            <TodoListFilter />
            <TodoList />
            <TodoListEntry />
        </div>
    );
};
