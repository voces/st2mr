import Joi from "joi";

import { knex } from "../../data/knex";
import { Spec } from "../platform/common";

export const listEndpoint: Spec<
	{ name: string; parent: number | null; id: number }[],
	{ body: { name?: string } }
> = {
	body: Joi.object({ name: Joi.string() }),
	handler: async ({ body: { name } }) => {
		const res = await knex("terrains")
			.where(name ? { name } : {})
			.orderBy("created_at", "desc")
			.limit(20)
			.select("name", "parent", "created_at", "id");

		return res;
	},
};
