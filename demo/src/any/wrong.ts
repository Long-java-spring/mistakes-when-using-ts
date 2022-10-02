function useAnyType() {
    const text: any = undefined;
    console.log("VALUE: ", text);

    const str: String = "1 + 1";
    // @ts-ignore
    console.log("SUM = ", eval(str));
    /** SUM=  2 */
}

useAnyType();