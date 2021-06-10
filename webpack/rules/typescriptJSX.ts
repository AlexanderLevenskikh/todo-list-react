import { RuleSetRule } from 'webpack';
import { IWebpackJavascriptRuleCreatorArgs } from './javascript';
import { webpackBabelLoader } from './loaders/babel';
import { webpackReactHotLoader } from './loaders/reactHotLoader';

export interface IWebpackTSXRuleCreatorArgs extends IWebpackJavascriptRuleCreatorArgs {
    wds?: boolean;
}

export const webpackTSXRule = ({ wds = false, include, configFile }: IWebpackTSXRuleCreatorArgs): RuleSetRule => ({
    test: /\.[jt]sx$/,
    use: [
        ...(wds ? [ webpackReactHotLoader() ] : []),
        webpackBabelLoader(configFile),
    ],
    include,
});
