import Link from "next/link";

const contacts = [
	{ label: "Email", value: "gordonliu1106@gmail.com", href: "mailto:gordonliu1106@gmail.com" },
	{ label: "GitHub", value: "gordonliu0", href: "https://github.com/gordonliu0" },
	{ label: "Instagram", value: "gg1iu", href: "https://www.instagram.com/gg1iu" },
];

const interests = [
	"Vision transformers",
	"Cloud GPU deployment optimization",
	"Finetuning foundation models",
];

export default function Home() {
	return (
		<div className="flex flex-col gap-24">
			<header>
				<h1 className="font-light text-5xl leading-[1.05] tracking-tight sm:text-7xl">
					Machine learning researcher and software engineer,
					<span className="text-muted">
						{" "}
						building at the edge of theory and practice.
					</span>
				</h1>
			</header>

			<section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
				<p className="font-mono text-muted text-xs uppercase tracking-widest">
					About
				</p>
				<div className="flex flex-col gap-4 text-lg leading-relaxed">
					<p>
						I've always been fascinated by how different fields of knowledge
						connect in unexpected ways. This is a space dedicated to sharing
						and exploring ideas.
					</p>
					<p>
						One of my guiding principles is that both theoretical rigor and
						uninhibited practical experimentation are needed to reach
						breakthroughs. You'll find this philosophy throughout my projects,
						research, and writing.
					</p>
				</div>
			</section>

			<section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
				<p className="font-mono text-muted text-xs uppercase tracking-widest">
					Interests
				</p>
				<ul className="flex flex-col divide-y divide-hairline border-hairline border-y">
					{interests.map((interest) => (
						<li key={interest} className="py-3 text-lg">
							{interest}
						</li>
					))}
				</ul>
			</section>

			<section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
				<p className="font-mono text-muted text-xs uppercase tracking-widest">
					Reach
				</p>
				<ul className="flex flex-col divide-y divide-hairline border-hairline border-y">
					{contacts.map((contact) => (
						<li
							key={contact.href}
							className="grid grid-cols-[8rem_1fr] items-baseline gap-6 py-3"
						>
							<span className="font-mono text-muted text-xs uppercase tracking-widest">
								{contact.label}
							</span>
							<a
								href={contact.href}
								target={contact.href.startsWith("http") ? "_blank" : undefined}
								rel="noreferrer"
								className="text-lg underline-offset-4 hover:underline"
							>
								{contact.value}
							</a>
						</li>
					))}
				</ul>
			</section>

			<section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
				<p className="font-mono text-muted text-xs uppercase tracking-widest">
					See also
				</p>
				<p className="text-lg leading-relaxed">
					Past work lives in{" "}
					<Link
						href="/projects"
						className="underline underline-offset-4 hover:text-muted"
					>
						projects
					</Link>
					.
				</p>
			</section>
		</div>
	);
}
