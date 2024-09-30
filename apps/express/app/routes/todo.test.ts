import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../index";

describe("Todo Endpoints", () => {
	it("POST / should create a new todo", async () => {
		const response = await request(app)
			.post("/api/todo")
			.send({ text: "Test todo" });

		expect(response.status).toBe(201);
		expect(response.body.status).toBe("success");
		expect(response.body.data.message).toBe("Created the todo.");
		expect(response.body.data.createdTodo).toHaveProperty("id");
		expect(response.body.data.createdTodo.text).toBe("Test todo");
		expect(response.body.data.createdTodo.completed).toBe(false);
	});

	it("GET / should return all todos", async () => {
		const response = await request(app).get("/api/todo");
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("success");
		expect(Array.isArray(response.body.data.items)).toBe(true);
		expect(response.body.data.items.length).toBeGreaterThan(0);
	});
});
