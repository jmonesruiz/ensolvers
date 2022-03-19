import "dotenv/config";
import { setupDb } from "./services/db.js";
import { appConfig, dbConfig } from "./config/index.js";
import app from "./app.js";

async function initApp(appConfig, dbConfig) {
	try {
		const dbState = await setupDb(dbConfig);
		if (dbState.success) {
			app.listen(appConfig.port, () => {
				console.log(`Listening on port ${appConfig.port}`);
			});
		} else {
			throw dbState.error;
		}
	} catch (error) {
		console.error(error);
		process.exit(0);
	}
}

initApp(appConfig, dbConfig);
