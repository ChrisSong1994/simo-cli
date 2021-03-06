import webpack from 'webpack';
import Api from '../api';
declare const formatStats: (stats: webpack.Stats, dir: string, api: Api) => string;
export default formatStats;
