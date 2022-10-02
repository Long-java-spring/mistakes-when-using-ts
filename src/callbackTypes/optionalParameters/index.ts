interface Fetcher {
    getObject(done: (data: unknown, elapsedTime?: number) => void): void;
}

interface Fetcher {
    getObject(done: (data: unknown, elapsedTime: number) => void): void;
}