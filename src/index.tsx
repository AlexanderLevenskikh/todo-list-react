import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider } from 'antd';
import { AppLayout } from 'root/components/AppLayout/AppLayout';
import './general.less';

function initApp() {
    const root = document.getElementById('root');

    if (root) {
        ReactDOM.render(renderApp(), root);
    }

    function renderApp() {
        return (
            <ConfigProvider locale={ruRU}>
                <AppLayout />
            </ConfigProvider>
        );
    }
}

initApp();
