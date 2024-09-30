import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./index";

describe("Express - Todo App", () => {
	it("GET /api should return hello world", async () => {
		const response = await request(app).get("/api");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ name: "Hello world" });
	});
});
