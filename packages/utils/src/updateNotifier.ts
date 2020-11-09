import updateNotifier, { Package } from 'update-notifier';

export default (pkg: Package) => {
  // 检查安装包更新情况
  updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
  }).notify();
};
