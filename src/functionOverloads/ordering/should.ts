declare function fn(x: object): string;
declare function fn(x: unknown): unknown;
declare function fn(x: number): number;

let el: unknown = {};
const element = fn(el);
