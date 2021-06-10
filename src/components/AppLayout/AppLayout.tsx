import React from 'react';
import { FC } from 'react';
import { AppHeader } from 'root/components/AppHeader/AppHeader';
import styles from './styles.less';

export const AppLayout: FC = () => {
    return (
        <main className={styles.wrapper}>
            <AppHeader />
            <section className={styles.content}>main</section>
        </main>
    );
};
