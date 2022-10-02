/* WRONG */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number): Moment;
    utcOffset(b: string): Moment;
}

/* SHOULD */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number | string): Moment;
}