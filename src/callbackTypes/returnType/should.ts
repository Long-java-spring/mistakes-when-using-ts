function testCallbackVoidFn(callback: () => void) {
    var k = callback();
    // @ts-ignore
    k.doSomething();
    /** ERROR: Cannot read property 'doSomething' of undefined */
}

function voidFn(): void {
    console.log("Call back!!!");
}

function testVoidFn() {
    testCallbackVoidFn(voidFn);
}

testVoidFn();