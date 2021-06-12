import React, { FC, useEffect } from 'react';
import { useMst } from 'root/stores/react/useMst';
import { useObserver } from 'mobx-react';
import { TodoListItem } from 'root/components/TodoListItem';
import styles from './styles.less';

export const TodoList: FC = () => {
    const { todoList } = useMst();

    useEffect(() => {
        todoList.load();
    }, []);

    return useObserver(() => (
        <ul className={styles.ul}>
            {todoList.items.map((item) => (
                <li key={item.id} className={styles.li}>
                    <TodoListItem item={item} />
                </li>
            ))}
        </ul>
    ));
};
