import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppLayout } from 'root/components/AppLayout/AppLayout';
import './general.less';
import { StoreProvider } from 'root/stores/react/context';
import { store } from 'root/stores';
import { TodoList } from 'root/components/TodoList';

function initApp() {
    const root = document.getElementById('root');

    if (root) {
        ReactDOM.render(renderApp(), root);
    }

    function renderApp() {
        return (
            <StoreProvider value={store}>
                <AppLayout>
                    <TodoList />
                </AppLayout>
            </StoreProvider>
        );
    }
}

initApp();
