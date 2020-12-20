import Joi from "joi";

const emptyObject = {};
type EmptyObject = typeof emptyObject;

export interface Spec<Resp, Req = EmptyObject> {
	body?: Joi.ObjectSchema;
	handler: (req: Req) => Promise<Resp | ApiError>;
}

export interface ApiError {
	id: string;
	code?: 400 | 404 | 500;
	error: string;
}
