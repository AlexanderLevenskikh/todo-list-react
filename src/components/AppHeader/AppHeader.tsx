import React from 'react';
import { FC } from 'react';
import styles from './styles.less';

export const AppHeader: FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>TODO LIST</h1>
        </header>
    );
};
