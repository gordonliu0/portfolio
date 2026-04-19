import { Redis } from "@upstash/redis";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { getAllSlugs, getProject } from "../_data";
import { ProjectHeader } from "./project-header";
import { TrackPageview } from "./track-pageview";

export const revalidate = 60;

const redis = Redis.fromEnv();

export function generateStaticParams() {
	return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = await getProject(slug);

	if (!project || project.meta.published === false) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	const { Component } = project;

	return (
		<SidebarLayout
			sidebar={
				<Link
					href="/projects"
					aria-label="Back to projects"
					className="font-light text-5xl text-muted leading-none hover:text-ink sm:text-6xl"
				>
					←
				</Link>
			}
		>
			<div className="flex flex-col gap-12">
				<ProjectHeader project={project.meta} views={views} />
				<TrackPageview slug={slug} />
				<article className="prose prose-lg max-w-none">
					<Component />
				</article>
			</div>
		</SidebarLayout>
	);
}
