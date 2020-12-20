import Joi from "joi";

import { knex } from "../../data/knex";
import { Spec } from "../platform/common";

export const uploadEndpoint: Spec<
	{ id: number },
	{ body: { name: string; data: string; parent: string } }
> = {
	body: Joi.object({
		name: Joi.string().required(),
		data: Joi.string().required(),
		parent: Joi.number().integer(),
	}),
	handler: async ({ body: { name, data, parent } }) => {
		try {
			JSON.parse(data);
		} catch (err) {
			return {
				id: "invalid_json",
				code: 400,
				error: `"data" is invalid JSON`,
			};
		}

		if (!parent) {
			const exists = await knex("terrains")
				.where({ name })
				.count("id", { as: "count" });

			if (exists[0].count)
				return {
					id: "duplicate_name",
					code: 400,
					error: `Terrain with name "${name}" already exists. Provide a "parent" if you'd like to extend it.`,
				};
		}

		const res = await knex("terrains")
			.insert({ name, data, parent })
			.catch((err) => err);

		if ("code" in res) {
			if (res.code === "SQLITE_CONSTRAINT")
				return {
					id: "duplicate_name",
					code: 400,
					error: `Terrain with name "${name}" already exists`,
				};
			else {
				console.error(res);
			}
		}

		return { id: res[0] };
	},
};
