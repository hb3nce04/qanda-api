import express from "express";

import { addUser, authenticateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/authenticate", authenticateUser);

export default router;
