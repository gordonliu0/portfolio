import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type ProjectFrontmatter = {
	title: string;
	description: string;
	date: string;
	startDate?: string;
	endDate?: string;
	url?: string;
	repository?: string;
	tags?: string[];
	draft?: boolean;
};

export type Project = ProjectFrontmatter & { slug: string; id: string };

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllSlugs(): string[] {
	return fs
		.readdirSync(PROJECTS_DIR)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllProjects(): Promise<Project[]> {
	const slugs = getAllSlugs();
	const metas = await Promise.all(
		slugs.map(async (slug) => {
			const mdxModule = await import(`@/content/projects/${slug}.mdx`);
			return { slug, ...(mdxModule.metadata as ProjectFrontmatter) };
		}),
	);
	const byDateAsc = [...metas].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);
	const idBySlug = new Map(
		byDateAsc.map((p, i) => [p.slug, String(i + 1).padStart(3, "0")]),
	);
	return metas.map((p) => ({ ...p, id: idBySlug.get(p.slug) ?? "000" }));
}

export async function getProject(
	slug: string,
): Promise<{ meta: Project; Component: ComponentType } | null> {
	try {
		const all = await getAllProjects();
		const meta = all.find((p) => p.slug === slug);
		if (!meta) return null;
		const mdxModule = await import(`@/content/projects/${slug}.mdx`);
		return { meta, Component: mdxModule.default };
	} catch {
		return null;
	}
}
