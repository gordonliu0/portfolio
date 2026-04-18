import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const runtime = "edge";

export async function POST(request: Request): Promise<Response> {
	if (request.headers.get("Content-Type") !== "application/json") {
		return new Response("must be json", { status: 400 });
	}

	const body = await request.json();
	let slug: string | undefined;
	if ("slug" in body) {
		slug = body.slug;
	}
	if (!slug) {
		return new Response("Slug not found", { status: 400 });
	}
	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		request.headers.get("x-real-ip") ??
		undefined;
	if (ip) {
		// Hash the IP in order to not store it directly in your db.
		const buf = await crypto.subtle.digest(
			"SHA-256",
			new TextEncoder().encode(ip),
		);
		const hash = Array.from(new Uint8Array(buf))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		// deduplicate the ip for each slug
		const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
			nx: true,
			ex: 24 * 60 * 60,
		});
		if (!isNew) {
			return new Response(null, { status: 202 });
		}
	}
	await redis.incr(["pageviews", "projects", slug].join(":"));
	return new Response(null, { status: 202 });
}
