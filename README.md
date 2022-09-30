# mistakes-when-using-ts
Some mistakes when using typescript

## General Types

**Don’t** ever use the types Number, String, Boolean, Symbol, or Object These types refer 
to non-primitive boxed objects that are almost never used appropriately in JavaScript code.
```
/* WRONG */
function reverse(s: String): String;
```
**Do**: use the types number, string, boolean, and symbol.
```
/* SHOULD */
function reverse(s: string): string;
```
Instead of Object, use the non-primitive object type (added in TypeScript 2.2).

## Any

### Define variable type

**Don’t** use any as a type unless you are in the process of migrating a JavaScript project to TypeScript or use `@ts-ignore`
```
/* WRONG */
const value: any = 1
OR
// @ts-ignore
const value: string = 1
```
**Do**: In cases where you don’t know what type you want to accept, 
or when you want to accept anything because you will be blindly passing it through without interacting with it, 
you can use [unknown](https://www.typescriptlang.org/play/#example/unknown-and-never).
```
/* SHOULD */
const value: unknown = 1
```

### Return Types of Callbacks

**Don’t** use the return type `any` for callbacks whose value will be ignored:
```
/* WRONG */
function fn(x: () => any) {
  x();
}
```
**Do**: use the return type void for callbacks whose value will be ignored:
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

## Overloads and Callbacks
## Function Overloads
## Use Optional Parameters
## Use Union Types