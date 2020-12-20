import Knex from "knex";

export const knex = Knex({
	client: "sqlite3",
	connection: { filename: "./data.db" },
	useNullAsDefault: true,
});

knex.schema.hasTable("terrains").then(async (exists) => {
	if (!exists)
		await knex.schema.createTable("terrains", (table) => {
			table.increments("id");
			table.string("name");
			table.unique(["name"]);
			table.binary("data");
		});
});
