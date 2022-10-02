function parseValue(key: string) {
    console.log("DATA: ", eval(key));
    /** DATA:  2 */
}

function parseFn() {
    const text: string = "1+1";
    parseValue(text); 
}

parseFn();