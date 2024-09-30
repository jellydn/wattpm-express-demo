import { type Request, type Response, Router } from "express";

import { Todo } from "../../models/todo";

// Define interfaces for request bodies and parameters
interface TodoBody {
	text: string;
}

const router = Router();

const generateUUID = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

const todoItems: Todo[] = [
	{
		id: generateUUID(),
		text: "Setup demo with Watt and Express v5",
		completed: false,
	},
];

router.post(
	"/",
	(
		req: Request<
			unknown,
			{
				message: string;
				createdTodo: Todo;
			},
			TodoBody
		>,
		res: Response,
	) => {
		const { text } = req.body;
		const newTodo = new Todo(generateUUID(), text);
		todoItems.push(newTodo);

		res
			.status(201)
			.jsend.success({ message: "Created the todo.", createdTodo: newTodo });
	},
);

router.get("/", (_req, res, _next) => {
	res.jsend.success({ items: todoItems });
});

export default router;
