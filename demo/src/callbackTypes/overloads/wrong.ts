declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(
  action: (done: ActionFn) => void,
  timeout?: number
): void;

interface ActionFn {
  print(done: (data: unknown, elapsedTime?: number) => void): void;
}