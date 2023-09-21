import express from "express";

import questionRoutes from "./routes/question.js";
import userRoutes from "./routes/user.js";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).json({
		message: `API verzió: ${process.env.npm_package_version}`,
	});
});

router.use("/questions", questionRoutes);
router.use("/users", userRoutes);

export default router;
