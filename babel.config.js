module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
            },
        ],
        '@babel/typescript',
        '@babel/react',
    ];
    const plugins = [
        [
            'import',
            {
                customName: (name) => {
                    return `antd/es/${name}`;
                },
                libraryName: 'antd',
                style: true,
            },
        ],
        [
            'import',
            {
                libraryName: '@ant-design/icons',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            '@ant-design/icons',
        ],
    ];
    return {
        sourceType: 'unambiguous',
        presets,
        plugins,
    };
};
