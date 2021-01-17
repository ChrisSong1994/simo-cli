import { ITplParams } from '../type';
export declare const templateTypes: {
    key: string;
    name: string;
    value: string;
}[];
declare const getTemplateParams: () => Promise<ITplParams>;
export default getTemplateParams;
