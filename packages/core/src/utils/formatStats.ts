import webpack from 'webpack';
import { chalk, cliui } from '@chrissong/simo-utils';

import Api from '../api';

const ui = cliui({ width: process.stdout.columns || 80 });

const formatStats = (stats: webpack.Stats, dir: string, api: Api) => {

  const json = (stats as webpack.Stats).toJson({
    hash: false,
    modules: false,
    chunks: false,
  });

  let assets = json.assets
    ? json.assets
    : (json.children as webpack.StatsCompilation[]).reduce(
        (acc, child) => acc.concat(child.assets),
        [],
      );

  const seenNames = new Map();
  const isJS = (val: string) => /\.js$/.test(val);
  const isCSS = (val: string) => /\.css$/.test(val);
  const isMinJS = (val: string) => /\.min\.js$/.test(val);

  assets = assets
    .map((a: any) => {
      a.name = a.name.split('?')[0];
      return a;
    })
    .filter((a: any) => {
      if (seenNames.has(a.name)) {
        return false;
      }
      seenNames.set(a.name, true);
      return isJS(a.name) || isCSS(a.name);
    })
    .sort((a: any, b: any) => {
      if (isJS(a.name) && isCSS(b.name)) return -1;
      if (isCSS(a.name) && isJS(b.name)) return 1;
      if (isMinJS(a.name) && !isMinJS(b.name)) return -1;
      if (!isMinJS(a.name) && isMinJS(b.name)) return 1;
      return b.size - a.size;
    });

  function formatSize(size: number) {
    return (size / 1024).toFixed(2) + ' KiB';
  }

  function makeRow(a: any, b: any, c?: any) {
    return `  ${a}\t  ${b}\t ${c}`;
  }

  function formatChunks(chunks: string[]) {
    return chunks.join(',');
  }

  ui.div(
    makeRow(chalk.cyan.bold(`File`), chalk.cyan.bold(`Size`), chalk.cyan.bold(`Chunks`)) +
      `\n` +
      assets
        .map((asset: any) =>
          makeRow(
            /js$/.test(asset.name)
              ? chalk.green(`${dir}/${asset.name}`)
              : chalk.blue(`${dir}/${asset.name}`),
            formatSize(asset.size),
            formatChunks(Array.from(asset.chunkNames)),
          ),
        )
        .join(`\n`),
  );

  return `\n${ui.toString()}\n`;
};

export default formatStats;
