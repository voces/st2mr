// require("ts-node/register");

import { join } from "path";

export default {
	client: "sqlite3",
	connection: { filename: "./data.db" },
	useNullAsDefault: true,
	migrations: {
		tableName: "knex_migrations",
		directory: join(__dirname, "migrations"),
	},
};
