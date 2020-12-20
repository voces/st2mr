import Joi from "joi";

import { knex } from "../../data/knex";
import { Spec } from "../platform/common";

export const uploadEndpoint: Spec<
	{ id: number },
	{ body: { name: string; data: string } }
> = {
	body: Joi.object({
		name: Joi.string().required(),
		data: Joi.string().required(),
	}),
	handler: async ({ body: { name, data } }) => {
		try {
			JSON.parse(data);
		} catch (err) {
			return {
				id: "invalid_json",
				code: 400,
				error: `"data" is invalid JSON`,
			};
		}

		const res = await knex("terrains")
			.insert({ name, data })
			.catch((err) => err);

		if ("code" in res) {
			if (res.code === "SQLITE_CONSTRAINT")
				return {
					id: "duplicate_name",
					code: 400,
					error: `Terrain with name "${name}" already exists`,
				};
		}

		return { id: res[0] };
	},
};
