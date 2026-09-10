const socials = [
  {
    href: "https://github.com/gordonliu0",
    label: "GitHub",
    value: "@gordonliu0",
  },
  {
    href: "https://www.linkedin.com/in/gordonliu1",
    label: "LinkedIn",
    value: "@gordonliu1",
  },
  {
    href: "https://www.instagram.com/gordnliu",
    label: "Instagram",
    value: "@gordnliu",
  },
  {
    href: "https://x.com/gordnliu",
    label: "X",
    value: "@gordnliu",
  },
];

const currentProjects = [
  { href: "https://speedyghost.ai", name: "speedyghost.ai" },
  { href: "https://acquisition.speedyghost.ai", name: "acquisition.ai" },
  { href: "https://trymona.vercel.app", name: "mona.ai" },
  { href: "https://withfinn.ai", name: "withfinn.ai" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <header>
        <h1 className="font-light text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          Serial founder
          <span className="text-muted">
            {" "}
            building AI applications and agents.
          </span>
        </h1>
      </header>

      <section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <p className="font-mono text-muted text-xs uppercase tracking-widest">
          About
        </p>
        <div className="flex flex-col gap-4 text-lg leading-relaxed">
          <p>
            I build and use AI agents across internal tools, consumer products,
            and business applications. My focus is on how agents interact with
            people, tools, and one another—and how to verify that they do their
            jobs well.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <p className="font-mono text-muted text-xs uppercase tracking-widest">
          Current projects
        </p>
        <ul className="flex flex-col divide-y divide-hairline border-hairline border-y">
          {currentProjects.map((project) => (
            <li className="py-3 text-lg" key={project.href}>
              <a
                className="underline-offset-4 hover:underline"
                href={project.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <p className="font-mono text-muted text-xs uppercase tracking-widest">
          Contact
        </p>
        <a
          className="text-lg underline-offset-4 hover:underline"
          href="mailto:gordonliu1106@gmail.com"
        >
          gordonliu1106@gmail.com
        </a>
      </section>

      <section className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <p className="font-mono text-muted text-xs uppercase tracking-widest">
          Socials
        </p>
        <ul className="flex flex-col divide-y divide-hairline border-hairline border-y">
          {socials.map((social) => (
            <li
              className="grid grid-cols-[8rem_1fr] items-baseline gap-6 py-3"
              key={social.href}
            >
              <span className="font-mono text-muted text-xs uppercase tracking-widest">
                {social.label}
              </span>
              <a
                className="text-lg underline-offset-4 hover:underline"
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {social.value}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
