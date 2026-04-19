import type { Project } from "../_data";

type ProjectHeaderProps = {
	project: Project;
	views: number;
};

function formatDate(iso: string): string {
	return Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(new Date(iso));
}

function formatHost(url: string): string {
	try {
		return new URL(url).host.replace(/^www\./, "");
	} catch {
		return url;
	}
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
	project,
	views,
}) => {
	const rows: { label: string; value: React.ReactNode }[] = [];

	rows.push({ label: "Published", value: formatDate(project.date) });

	if (project.startDate) {
		rows.push({
			label: "Worked",
			value: `${formatDate(project.startDate)} — ${formatDate(project.date)}`,
		});
	}

	if (project.tags && project.tags.length > 0) {
		rows.push({ label: "Tags", value: project.tags.join(", ") });
	}

	if (project.repository) {
		rows.push({
			label: "Repository",
			value: (
				<a
					href={project.repository}
					target="_blank"
					rel="noreferrer"
					className="underline underline-offset-4 hover:text-ink"
				>
					{formatHost(project.repository)}
				</a>
			),
		});
	}

	if (project.url) {
		rows.push({
			label: "Live",
			value: (
				<a
					href={project.url}
					target="_blank"
					rel="noreferrer"
					className="underline underline-offset-4 hover:text-ink"
				>
					{formatHost(project.url)}
				</a>
			),
		});
	}

	rows.push({
		label: "Views",
		value: Intl.NumberFormat("en-US", { notation: "compact" }).format(views),
	});

	return (
		<header className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<h1 className="font-light text-5xl leading-[1.05] tracking-tight sm:text-6xl">
					{project.title}
				</h1>
				<p className="text-lg text-muted leading-relaxed">
					{project.description}
				</p>
			</div>

			<dl className="grid grid-cols-[8rem_1fr] gap-y-3 font-mono text-sm">
				{rows.map((row) => (
					<div key={row.label} className="contents">
						<dt className="text-muted text-xs uppercase tracking-widest">
							{row.label}
						</dt>
						<dd className="text-ink">{row.value}</dd>
					</div>
				))}
			</dl>
		</header>
	);
};
