import express from "express";

import {
	getAllQuestions,
	getQuestionByID,
	addQuestion,
} from "../controllers/question.js";

import { verifyUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestionByID);
router.post("/", verifyUser, addQuestion);

export default router;
