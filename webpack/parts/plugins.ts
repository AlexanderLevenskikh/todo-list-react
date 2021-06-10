import path from "path";
import { Configuration } from 'webpack';
import { webpackContext } from '../context';
import { webpackMiniCssPlugin } from '../plugins/mini-css-extract';
import { webpackHTMLPlugin } from '../plugins/html';
import { webpackForkTsCheckerPlugin } from '../plugins/fork-ts-checker';
import { webpackDevServerHMRPlugin } from '../plugins/devServerHMR';

interface IWebpackPluginsPartArgs {
    serviceTitle: string;
    wds: boolean;
}

export const webpackPluginsPart = ({ serviceTitle, wds }: IWebpackPluginsPartArgs): Configuration['plugins'] => {
    return [
        webpackMiniCssPlugin('[name].[contenthash].css'),
        webpackHTMLPlugin({
            title: serviceTitle,
            templatePath: path.resolve(webpackContext, 'public/index.html'),
        }),
        webpackForkTsCheckerPlugin(path.resolve(webpackContext, 'tsconfig.json')),
        ...(wds ? [ webpackDevServerHMRPlugin() ] : []),
    ];
}
