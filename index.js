import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import apiRoutes from "./api/main.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
	console.log(
		`REST API (${process.env.NODE_ENV}) elindítva itt: http://localhost:${PORT}`
	);
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", apiRoutes);
