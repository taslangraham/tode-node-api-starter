class ExampleService {
    private _foo = "foo";

    constructor() {
        //
    }

    get foo() {
        return this._foo;
    }

    set foo(val: string) {
        this._foo = val;
    }
}

const example = new ExampleService();

export { example };
