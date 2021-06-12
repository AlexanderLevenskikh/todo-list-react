import React, { FC, SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { useMst } from 'root/stores/react/useMst';
import { TodoListCompletionFilter } from 'root/models/todoList';
import { Select } from 'evergreen-ui';
import styles from './styles.less';

export const TodoListFilter: FC = observer(() => {
    const { todoList } = useMst();

    return (
        <div className={styles.selectWrapper}>
            Show &nbsp;
            <Select onChange={changeCompletionFilter} value={todoList.completionFilter}>
                <option value={TodoListCompletionFilter.All}>All</option>
                <option value={TodoListCompletionFilter.Completed}>Completed</option>
                <option value={TodoListCompletionFilter.Uncompleted}>Uncompleted</option>
            </Select>
            &nbsp; items
        </div>
    );

    function changeCompletionFilter(event: SyntheticEvent<HTMLSelectElement>) {
        todoList.load({
            completionFilter: event.currentTarget.value as TodoListCompletionFilter,
        });
    }
});
