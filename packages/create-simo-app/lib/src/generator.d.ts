import path from 'path';
export declare const copyTpl: (cwd: string, params: {
    templatePath: string;
    target: string;
    context: object;
}) => void;
export declare const copyDirectory: (params: {
    path: string;
    context: object;
    target: string;
}) => void;
export declare const pullProject: (params: {
    repository: string;
    context: object;
    target: string;
}) => Promise<void>;
