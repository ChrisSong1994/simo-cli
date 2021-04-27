import _ from 'lodash';

import { IObj } from '../../type';

const getProxyConfig = (proxy: IObj) => {
  if (_.isArray(proxy)) return proxy;

  const result = Object.keys(proxy).map((context) => {
    if (typeof proxy[context] === 'string') {
      return {
        context: context,
        target: proxy[context],
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      };
    } else {
      return {
        context,
        ...proxy[context],
      };
    }
  });

  return result;
};

export default getProxyConfig;
