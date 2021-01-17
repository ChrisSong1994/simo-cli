import path from 'path';
export declare const copyTpl: (cwd: string, opts: {
    templatePath: string;
    target: string;
    context: object;
}) => void;
export declare const copyDirectory: (opts: {
    path: string;
    context: object;
    target: string;
}) => void;
