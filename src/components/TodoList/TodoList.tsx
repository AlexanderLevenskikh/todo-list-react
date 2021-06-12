import React, { FC } from 'react';
import { useMst } from 'root/stores/react/useMst';
import { observer } from 'mobx-react';
import { TodoListItem } from 'root/components/TodoListItem/TodoListItem';
import styles from './styles.less';
import { Paging } from 'root/components/Paging/Paging';
import { InlineAlert } from 'evergreen-ui';

export const TodoList: FC = observer(() => {
    const { todoList } = useMst();

    return (
        <ul className={styles.ul}>
            {todoList.items.map((item) => (
                <li key={item.id} className={styles.li}>
                    <TodoListItem item={item} />
                </li>
            ))}
            <div className={styles.footerWrapper}>
                <div className={styles.counters}>
                    <InlineAlert intent='none'>
                        Completed: {todoList.completedCount} / Total: {todoList.totalCount}
                    </InlineAlert>
                </div>
                <Paging
                    pagesCount={todoList.pagesCount}
                    activePage={todoList.activePage}
                    itemsPerPage={todoList.limit}
                    changePage={changePage}
                    changeItemsPerPage={changeItemsPerPage}
                />
            </div>
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
