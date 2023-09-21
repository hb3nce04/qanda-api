import prisma from "../../libs/prisma.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addUser = async (req, res, next) => {
	const { name, password, email } = req.body;

	const foundUser = await prisma.users.count({
		where: { name: name },
	});

	const foundEmail = await prisma.users.count({
		where: { email: email },
	});

	if (foundUser > 0) {
		res.status(200).json({ message: "Ez a felhasználónév már foglalt!" });
		return;
	}

	if (foundEmail > 0) {
		res.status(200).json({ message: "Ez az e-mail cím már foglalt!" });
		return;
	}

	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(password, salt);

	const newUser = await prisma.users
		.create({
			data: {
				name: name,
				password: passwordHash,
				email: email,
			},
		})
		.then((data) => {
			res.status(200).json({
				message: "Sikeres regisztráció!",
			});
		});
};

const authenticateUser = async (req, res, next) => {
	const { name, password } = req.body;

	const foundUser = await prisma.users.findFirst({
		where: { name: name },
	});

	if (foundUser) {
		const match = await bcrypt.compare(password, foundUser.password);
		if (match) {
			const token = jwt.sign(
				{ name: foundUser.name, id: foundUser.id },
				process.env.TOKEN_SECRET
			);
			res.status(200).json({ token: token });
			return;
		} else {
			res.status(200).json({
				message: "Hibás felhasználónév vagy jelszó!",
			});
			return;
		}
	} else {
		res.status(200).json({
			message: "Hibás felhasználónév vagy jelszó!",
		});
		return;
	}
};

const verifyUser = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null)
		return res.status(401).json({ message: "Nem található bearer token!" });

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);

		req.user = user;

		next();
	});
};

export { addUser, authenticateUser, verifyUser };
