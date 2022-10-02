declare function beforeAll(
    action: (done: DoneFn) => void,
    timeout?: number
): void;

interface DoneFn {
    print(done: (data: unknown, elapsedTime?: number) => void): void;
}