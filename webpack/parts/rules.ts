import { webpackTSXRule } from '../rules/typescriptJSX';
import { webpackCssRule, webpackFileRule, webpackLessRule } from '../rules';
import { webpackContext } from '../context';

interface IWebpackRulesPartArgs {
    wds: boolean;
    isProduction: boolean;
    babelConfigPath: string;
}

export const webpackRulesPart = ({ isProduction, wds, babelConfigPath }: IWebpackRulesPartArgs) => {
    return [
        webpackTSXRule({
            wds,
            include: /src/,
            configFile: babelConfigPath,
        }),
        webpackLessRule({
            isProduction,
            include: /src|antd/,
            postCSSConfigDirPath: webpackContext,
        }),
        webpackFileRule({
            include: /src/,
        }),
    ];
};
