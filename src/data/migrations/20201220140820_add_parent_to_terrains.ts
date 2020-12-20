import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
	await knex.schema.createTable("terrains_temp", (table) => {
		table.increments("id");
		table.string("name");
		table.index(["name"]);
		table.integer("parent");
		table.foreign("parent").references("terrains.id");
		table.binary("data");
		table.timestamps(false, true);
	});

	await knex("terrains").insert({ name: "hehe", data: "blah" });

	const data = await knex("terrains").select();
	if (data.length) await knex("terrains_temp").insert(data);

	await knex.schema.dropTable("terrains");

	await knex.schema.renameTable("terrains_temp", "terrains");
};

export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> =>
	knex.schema.alterTable("terrains", (table) => {
		table.dropForeign(["parent"]);
		table.dropColumn("parent");

		table.dropIndex(["name"]);
		table.unique(["name"]);

		table.dropTimestamps();
	});
