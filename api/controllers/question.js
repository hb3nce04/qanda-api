import prisma from "../../libs/prisma.js";

const getAllQuestions = async (req, res, next) => {
	const questions = await prisma.questions
		.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};

const getQuestionByID = async (req, res, next) => {
	const id = req.params.id;
	const questions = await prisma.questions
		.findUnique({ where: { id: parseInt(id) } })
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};

const addQuestion = async (req, res, next) => {
	const { title, text, categoryid } = req.body;
	const question = await prisma.questions
		.create({
			data: {
				title: title,
				text: text,
				UserId: req.user.id,
				CategoryId: categoryid,
			},
		})
		.then((data) => {
			res.status(200).json({
				message: "A kérdés létrejött.",
				question: data,
			});
		});
};

export { getAllQuestions, getQuestionByID, addQuestion };
