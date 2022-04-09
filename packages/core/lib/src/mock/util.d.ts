export declare const getMockConfig: (files: string[]) => object;
export declare function parseKey(key: string): {
    method: string;
    path: string;
};
export declare const normalizeConfig: (config: any) => any;
export declare const getMockData: (cwd: string, ignore: any[]) => {
    mockData: any;
    mockPaths: string[];
    mockWatcherPaths: string[];
};
export declare const cleanRequireCache: (paths: string[]) => void;
