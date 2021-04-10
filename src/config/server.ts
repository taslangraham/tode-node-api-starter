import { app } from "../app";
import { configureCors } from "./cors";
configureCors();

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log("Your app is running on " + port);
});
