import express from "express";
import path from "path";
const app = express();

app.use(express.static(path.resolve("dist")));

app.get("/*", function (req, res) {
	res.sendFile(path.resolve("dist/index.html"));
});

app.listen(4000, () => {
	console.log("App served on port 4000");
});
