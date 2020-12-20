import * as Knex from "knex";

export const up = async (knex: Knex): Promise<Knex.SchemaBuilder> =>
	knex.schema.createTable("terrains", (table) => {
		table.increments("id");
		table.string("name");
		table.unique(["name"]);
		table.binary("data");
	});

export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> =>
	knex.schema.dropTable("terrains");
