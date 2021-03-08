declare const _default: {
    target: string;
    output: {
        path: string;
    };
    publicPath: string;
    port: number;
    host: string;
    proxy: {
        '/api': {
            target: string;
            changeOrigin: boolean;
            pathRewrite: {
                '^/api': string;
            };
        };
        '/edge': string;
    };
    externals: {};
    pages: {
        index: {
            entry: string;
            template: string;
            htmlWebpackPluginOptions: {
                __param: string;
            };
        };
    };
    parallel: boolean;
    browsersList: string[];
    extraBabelOptions: {
        presets: never[];
        plugins: never[];
    };
    ignoreMomentLocale: boolean;
};
export default _default;
