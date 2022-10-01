# mistakes-when-using-ts
Some mistakes when using typescript

## I. General Types

**Don’t** ever use the types Number, String, Boolean, Symbol, or Object These types refer 
to non-primitive boxed objects that are almost never used appropriately in JavaScript code.
```
/* WRONG */
function reverse(s: String): String;
```
**Do** use the types number, string, boolean, and symbol.
```
/* SHOULD */
function reverse(s: string): string;
```
Instead of Object, use the non-primitive object type (added in TypeScript 2.2).

## II. Any

### Define variable type

**Don’t** use any as a type unless you are in the process of migrating a JavaScript project to TypeScript or use `@ts-ignore`
```
/* WRONG */
const value: any = 1
OR
// @ts-ignore
const value: string = 1
```
**Do** In cases where you don’t know what type you want to accept, 
or when you want to accept anything because you will be blindly passing it through without interacting with it, 
you can use [unknown](https://www.typescriptlang.org/play/#example/unknown-and-never).
```
/* SHOULD */
const value: unknown = 1
```

## Callback Types

### 1. Return Types of Callbacks

**Don’t** use the return type `any` for callbacks whose value will be ignored:
```
/* WRONG */
function fn(x: () => any) {
  x();
}
```
**Do** use the return type void for callbacks whose value will be ignored:
```
/* SHOULD */
function fn(x: () => void) {
  x();
}
```
**Why**: Using void is safer because it prevents you from accidentally using the return value of x in an unchecked way:
```
function fn(x: () => void) {
  var k = x(); // oops! meant to do something else
  k.doSomething(); // error, but would be OK if the return type had been 'any'
}
```

### 2. Optional Parameters in Callbacks

**Don’t** use optional parameters in callbacks unless you really mean it:
```
/* WRONG */
interface Fetcher {
  getObject(done: (data: unknown, elapsedTime?: number) => void): void;
}
```
**Do** write callback parameters as non-optional:
```
/* SHOULD */
interface Fetcher {
  getObject(done: (data: unknown, elapsedTime: number) => void): void;
}
```

### 3. Overloads and Callbacks

**Don’t** write separate overloads that differ only on callback arity:
```
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```
**Do** write a single overload using the maximum arity:
```
/* SHOULD */
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```
**Why**: It’s always legal for a callback to disregard a parameter, 
so there’s no need for the shorter overload. 
Providing a shorter callback first allows incorrectly-typed functions to be passed in 
because they match the first overload.

## III. Function Overloads

### 1. Ordering

**Don’t** put more general overloads before more specific overloads:
```
/* WRONG */
declare function fn(x: unknown): unknown;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;
var myElem: HTMLDivElement;
var x = fn(myElem); // x: unknown, wat?
```
**Do** sort overloads by putting the more general signatures after more specific signatures:
```
/* SHOULD */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: unknown): unknown;
var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```
**Why**: TypeScript chooses the first matching overload when resolving function calls. 
When an earlier overload is “more general” than a later one, 
the later one is effectively hidden and cannot be called.

### 2. Use Optional Parameters

**Don’t** write several overloads that differ only in trailing parameters:
```
/* WRONG */
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
```
**Do** use optional parameters whenever possible:
```
/* SHOULD */
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```
**Why**: This is important for two reasons.
TypeScript resolves signature compatibility by seeing 
if any signature of the target can be invoked with the arguments of the source, 
and extraneous arguments are allowed.
```
function fn(x: (a: string, b: number, c: number) => void) {}
var x: Example;
// When written with overloads, OK -- used first overload
// When written with optionals, correctly an error
fn(x.diff);
```
A consumer uses the “strict null checking” feature of TypeScript. 
Because unspecified parameters appear as undefined in JavaScript, 
it’s usually fine to pass an explicit undefined to a function with optional arguments. 
This code, for example, should be OK under strict nulls:
```
var x: Example;
// When written with overloads, incorrectly an error because of passing 'undefined' to 'string'
// When written with optionals, correctly OK
x.diff("something", true ? undefined : "hour");
```

### 3. Use Union Types

**Don’t** write overloads that differ by type in only one argument position:
```
/* WRONG */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number): Moment;
  utcOffset(b: string): Moment;
}
```
**Do** use union types whenever possible:
```
/* SHOULD */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
/** Note that we didn’t make b optional here because the return types of the signatures differ. */
```
**Why**: This is important for people who are “passing through” a value to your function:
```
function fn(x: string): void;
function fn(x: number): void;
function fn(x: number | string) {
  // When written with separate overloads, incorrectly an error
  // When written with union types, correctly OK
  return moment().utcOffset(x);
}
```