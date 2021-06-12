import React, { FC } from 'react';
import { useMst } from 'root/stores/react/useMst';
import { observer } from 'mobx-react';
import { TodoListItem } from 'root/components/TodoListItem/TodoListItem';
import styles from './styles.less';
import { Paging } from 'root/components/Paging/Paging';

export const TodoList: FC = observer(() => {
    const { todoList } = useMst();

    return (
        <ul className={styles.ul}>
            {todoList.items.map((item) => (
                <li key={item.id} className={styles.li}>
                    <TodoListItem item={item} />
                </li>
            ))}
            <Paging
                pagesCount={todoList.pagesCount}
                activePage={todoList.activePage}
                changePage={changePage}
                changeItemsPerPage={changeItemsPerPage}
            />
            Completed: {todoList.completedCount} / Total: {todoList.totalCount}
        </ul>
    );

    function changePage(pageNumber: number) {
        todoList.load({
            offset: todoList.limit * (pageNumber - 1),
        });
    }

    function changeItemsPerPage(itemsPerPage: number) {
        todoList.load({
            limit: itemsPerPage,
            offset: 0,
        });
    }
});
