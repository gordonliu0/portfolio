import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";
import { Project } from "../components/Project";

export const revalidate = 0;

const redis = Redis.fromEnv();

// export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // const featured = allProjects.find((project) => project.slug === "unkey");
  // const top2 = allProjects.find((project) => project.slug === "planetfall");
  // const top3 = allProjects.find((project) => project.slug === "highstorm");
  const sorted = allProjects
    .filter((p) => p.published)
    // .filter(
    //   (project) =>
    //     project.slug !== featured.slug &&
    //     project.slug !== top2.slug &&
    //     project.slug !== top3.slug,
    // )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col items-start justify-start gap-6 p-24">
      {/* <Navigation /> */}
      <div className="text-xl font-semibold">Projects</div>
      <div className="flex flex-col justify-start items-start gap-6">
        {sorted.map((project) => {
          return <Project project={project} views={views[project.slug] ?? 0} />;
        })}
      </div>
    </div>
  );
}
