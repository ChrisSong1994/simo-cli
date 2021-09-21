declare const parallelToSerial: (items: Array<() => Promise<any>>, length?: number) => Promise<any[]>;
export default parallelToSerial;
