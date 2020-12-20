import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { api } from "./api";
import { port } from "./config";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(api);

app.listen(port, () => {
	console.log(`st2mr listening on http://localhost:${port}`);
});
