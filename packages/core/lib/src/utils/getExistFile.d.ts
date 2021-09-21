interface IEsistFilesProp {
    cwd: string;
    files: string[];
    returnRelative: boolean;
}
declare const getExistFile: ({ cwd, files, returnRelative }: IEsistFilesProp) => string | void;
export default getExistFile;
