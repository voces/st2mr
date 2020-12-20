import Joi from "joi";

import { knex } from "../../data/knex";
import { Spec } from "../platform/common";

export const downloadEndpoint: Spec<
	{ name: string; body: string; parent: number | null; id: number },
	{ body: { name: string } | { id: number } }
> = {
	body: Joi.object({
		name: Joi.string(),
		id: Joi.number().integer(),
	}).xor("name", "id"),
	handler: async ({ body }) => {
		const res = await knex("terrains")
			.where("name" in body ? { name: body.name } : { id: body.id })
			.orderBy("created_at", "asc")
			.select("name", "data", "parent", "id")
			.first();

		if (!res)
			return {
				id: "missing",
				code: 404,
				error:
					"name" in body
						? `Terrain with name "${body.name}" not found`
						: `Terrain with id "${body.id}" not found`,
			};

		return res;
	},
};
