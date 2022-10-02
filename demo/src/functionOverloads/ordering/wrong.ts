declare function fn(x: unknown): unknown;
declare function fn(x: number): number;
declare function fn(x: object): string;

let unknown: unknown;
const value = fn(unknown);
