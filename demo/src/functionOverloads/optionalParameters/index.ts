/** WRONG */
interface Example {
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}

/** SHOULD */
interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}