export interface ITemplate {
    name: string;
    repository: string;
    description: string;
    isBuiltIn: string;
}
declare const template: (cli: any, argv: any) => Promise<void>;
export default template;
