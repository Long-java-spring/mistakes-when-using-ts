function testCallback(callBackFn: () => any) {
    var k = callBackFn();
    k.doSomething();
    /** 
     * Lint: nothing
     * when run will throw error: k.doSomething is not a function 
     * */
}

function callBackFn(): number {
    return 1;
}

function testCallbackFn() {
    testCallback(callBackFn);
}

testCallbackFn();