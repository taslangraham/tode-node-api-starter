import { ORM } from "../app";
import { ServiceReponse } from "../config/constants";
import { ExampleEntity } from "../models/example/example.entity";
class Example {
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

    /**
     *
     * @param title Title of Example Entity
     */
    public async save(title: string) {
        let result: ServiceReponse<ExampleEntity>;
        try {
            const book = new ExampleEntity();
            book.title = title;
            await ORM.em.persistAndFlush(book);

            result = {
                success: true,
                data: book,
            };

            return result;

        } catch (error) {
            throw new Error(error);
        }
    }
}

const ExampleService = new Example();

export { ExampleService };
