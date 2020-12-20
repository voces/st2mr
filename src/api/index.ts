import { Router } from "express";

import { addEndpoint, withRouter } from "./platform/addEndpoint";
import { downloadEndpoint } from "./terrains/downloadEndpoint";
import { uploadEndpoint } from "./terrains/uploadEndpoint";

const router = Router();

withRouter(router, () => {
	addEndpoint("get", "/upload", uploadEndpoint);
	addEndpoint("get", "/download", downloadEndpoint);
});

export const api = router;
