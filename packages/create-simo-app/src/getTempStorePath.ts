import path from 'path';
import { fs, getUserHome } from '@chrissong/simo-utils';

const HOME_PATH = getUserHome();

const getTempStorePath = () => {
  // 先从全局找simo_template_store.json
  let templateStorePath = path.join(HOME_PATH, './.simo_template_store.json');
  if (!fs.existsSync(templateStorePath)) {
    fs.copyFileSync(path.join(__dirname, '../../.simo_template_store.json'), templateStorePath);
  }

  return templateStorePath
};

export default getTempStorePath;
