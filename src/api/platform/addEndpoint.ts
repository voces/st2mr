import { Router } from "express";
import Joi from "joi";

import { Spec } from "./common";

let router: Router;

export const withRouter = <T>(tempRouter: Router, fn: () => T): T => {
	const oldRouter = router;
	router = tempRouter;
	const ret = fn();
	router = oldRouter;
	return ret;
};

const emptyObject = Joi.object({});
export const addEndpoint = <Resp, Req>(
	type: "get" | "post" | "use",
	route: string,
	spec: Spec<Resp, Req>,
): Router =>
	router[type](route, async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/ban-types

		const body = { ...req.params, ...req.query, ...req.body };

		const validatedBody = (spec.body ?? emptyObject).validate(body);
		if (validatedBody?.error)
			return res.status(400).json({
				error: validatedBody.error.message,
			});

		const req2 = {
			body: body,
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await spec.handler(req2 as any);

		if (typeof result !== "object") {
			res.status(500);
			res.json({
				id: "invalid_response",
				error: "The server ran into an unexpected error",
			});
			return;
		}

		if (
			"error" in result &&
			result.error &&
			typeof result.code === "number"
		) {
			res.status(result.code);
			delete result.code;
		}

		res.json(result);
	});
