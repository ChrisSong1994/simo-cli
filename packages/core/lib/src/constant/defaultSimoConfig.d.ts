import WebpackChain from 'webpack-chain';
declare const _default: {
    useTypescript: boolean;
    base: string;
    outputPath: string;
    publicPath: string;
    target: string;
    alias: {
        '@': string;
    };
    port: number;
    host: string;
    inlineLimit: number;
    proxy: {
        '/api': {
            target: string;
            changeOrigin: boolean;
            pathRewrite: {
                '^/api': string;
            };
        };
    };
    report: boolean;
    devtool: string;
    externals: {
        react: string;
    };
    pages: {
        index: {
            entry: string;
            template: string;
        };
    };
    chainWebpack: (config: WebpackChain) => void;
};
export default _default;
