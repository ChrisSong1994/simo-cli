import which from 'which';

export default () => {
  return which.sync('yarn', { nothrow: true });
};
