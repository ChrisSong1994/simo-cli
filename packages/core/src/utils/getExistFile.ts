import { existsSync } from 'fs';
import { join } from 'path';

interface IEsistFilesProp {
  cwd: string;
  files: string[];
  returnRelative: boolean;
}

const getExistFile = ({ cwd, files, returnRelative }: IEsistFilesProp): string | void => {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
};

export default getExistFile;
