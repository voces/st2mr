import Joi from "joi";

import { knex } from "../../data/knex";
import { Spec } from "../platform/common";

export const downloadEndpoint: Spec<
	{ name: string; body: string },
	{ body: { name: string } }
> = {
	body: Joi.object({ name: Joi.string().required() }),
	handler: async ({ body: { name } }) => {
		const res = await knex("terrains")
			.where({ name: name })
			.select("name", "data")
			.first();

		if (!res)
			return {
				id: "missing",
				code: 404,
				error: `Terrain with name "${name}" not found`,
			};

		return res;
	},
};
