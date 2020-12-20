import { Router } from "express";

import { addEndpoint, withRouter } from "./platform/addEndpoint";
import { downloadEndpoint } from "./terrains/downloadEndpoint";
import { listEndpoint } from "./terrains/listEndpoint";
import { uploadEndpoint } from "./terrains/uploadEndpoint";

const router = Router();

withRouter(router, () => {
	addEndpoint("use", "/upload", uploadEndpoint);
	addEndpoint("get", "/download", downloadEndpoint);
	addEndpoint("get", "/list", listEndpoint);
});

export const api = router;
