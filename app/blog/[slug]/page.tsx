import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { getAllSlugs, getProject } from "../projects";
import { ProjectHeader } from "./project-header";

export const revalidate = 60;

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

  if (!project || project.meta.draft) {
    notFound();
  }

  const { Component } = project;

  return (
    <SidebarLayout
      sidebar={
        <Link
          aria-label="Back to blog"
          className="font-light text-5xl text-muted leading-none hover:text-ink sm:text-6xl"
          href="/blog"
        >
          ←
        </Link>
      }
    >
      <div className="flex flex-col gap-12">
        <ProjectHeader project={project.meta} />
        <article className="prose prose-lg max-w-none">
          <Component />
        </article>
      </div>
    </SidebarLayout>
  );
}
