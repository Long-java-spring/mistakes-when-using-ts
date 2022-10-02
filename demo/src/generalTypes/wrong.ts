function parseFailedValue(key: String) {
    console.log("DATA: ", eval(key));
    /** 
     * Argument of type 'String' is not assignable to parameter of type 'string'.
     * 'string' is a primitive, but 'String' is a wrapper object. 
     * Prefer using 'string' when possible
    */
}

function parseFailFn() {
    const text = String("1+1");
    parseFailedValue(text);
}

parseFailFn();