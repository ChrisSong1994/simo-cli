import { chokidar, lodash } from '@chrissong/simo-utils';
import { getMockData, cleanRequireCache } from './util';

const updateMockData = (app: any, mockData: any[]) => {
  for (const mock of mockData) {
    const { method, re, handler } = mock;
    app[method](re, handler);
  }
};

/** mock  数据
 * app {Application}
 * options {object}
 * *
 */
const mock = (cwd: string, app: any, options: any) => {
  if (options) {
    const ignore = [
      // ignore mock files under node_modules
      'node_modules/**',
      ...(options?.exclude || []),
    ];

    const { mockData, mockWatcherPaths } = getMockData(cwd, ignore);
    cleanRequireCache(mockWatcherPaths);
    updateMockData(app, mockData);
    const watcher = chokidar.watch(mockWatcherPaths, {
      ignoreInitial: true,
    });
    watcher.on(
      'all',
      lodash.debounce(() => {
        // @ts-ignore
        process.send('SIMO_SERVER_UPDATE');
      }, 300),
    );

    process.once('SIGINT', async () => {
      await watcher.close();
    });
  }
};

export default mock;
