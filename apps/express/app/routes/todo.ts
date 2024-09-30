import { type Request, type Response, Router } from "express";

import { Todo } from "../../models/todo";

// Define interfaces for request bodies and parameters
interface TodoBody {
	text: string;
}

const router = Router();

const todoItems: Todo[] = [
	{
		id: "1",
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
		const newTodo = new Todo(Math.random().toString(), text);
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
