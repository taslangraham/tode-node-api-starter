import cors, { CorsOptions } from "cors";
import { app } from "../app";

const corsOptions: CorsOptions = {
    methods: "GET,HEAD,PUT,PATCH,DELETE",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    origin: "google.com",
    preflightContinue: true,
};

function configureCors() {
    return app.use(cors(corsOptions));
}
export { configureCors };
