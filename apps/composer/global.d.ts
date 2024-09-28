import type {
	PlatformaticApp,
	PlatformaticComposerConfig,
} from "@platformatic/composer";
import { FastifyInstance } from "fastify";

declare module "fastify" {
	interface FastifyInstance {
		platformatic: PlatformaticApp<PlatformaticComposerConfig>;
	}
}
