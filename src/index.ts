import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { api } from "./api";
import { port } from "./config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(api);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
