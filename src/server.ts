require("express-async-errors");
import cors from "cors";
import bodyParser from "body-parser";
import app from "./app";

const port = process.env.PORT ?? 3333;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`pottmayer-automation-topic-listener started on port ${port}`);
});
