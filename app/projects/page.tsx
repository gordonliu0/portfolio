import Link from "next/link";
import { getAllProjects } from "./projects";

export const revalidate = 60;

export default async function ProjectsPage() {
	const projects = await getAllProjects();
	const visibleProjects = projects
		.filter((p) => p.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<ul className="flex flex-col">
			{visibleProjects.map((project) => {
				const year = new Date(project.date).getFullYear();
				return (
					<li key={project.slug}>
						<Link
							href={`/projects/${project.slug}`}
							className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-8 py-6"
						>
							<span className="font-mono text-muted text-xs uppercase tracking-widest">
								{project.id}
							</span>
							<h2 className="font-light text-2xl tracking-tight underline-offset-4 group-hover:underline sm:text-3xl">
								{project.title}
							</h2>
							<span className="font-mono text-muted text-xs uppercase tracking-widest">
								{year}
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
