import * as fs from 'fs';
import lessToJs from 'less-vars-to-js';
import * as path from 'path';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './antd-customization.less'), 'utf8'));

export const webpackLessLoader = () => ({
    loader: 'less-loader',
    options: {
        lessOptions: {
            modifyVars: themeVariables,
            javascriptEnabled: true,
        },
    },
});
