import sqlite from "sqlite3";
import path from "path";
import { open } from "sqlite";

sqlite.verbose();
let dbDir;

export const setupDb = async (dbConfig) => {
	dbDir = path.resolve(dbConfig.dbDir);
	return await execute(createTables);
};

export const execute = async (dbTask, args) => {
	try {
		const db = await open({
			filename: dbDir,
			driver: sqlite.Database,
		});
		const data = args ? await dbTask(db, ...args) : await dbTask(db);
		db.close();
		return data ? { success: true, data } : { success: true };
	} catch (error) {
		return { success: false, error };
	}
};

function createTables(db) {
	db.run("CREATE TABLE IF NOT EXISTS Folder (id INTEGER PRIMARY KEY, name TEXT NOT NULL)");
	db.run(
		"CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY, done INTEGER NOT NULL, name TEXT NOT NULL, id_folder INTEGER NOT NULL, FOREIGN KEY (id_folder) REFERENCES Folder(id) ON UPDATE RESTRICT ON DELETE CASCADE)"
	);
}
