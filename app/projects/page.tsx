import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Github } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

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
        <div className="flex flex-row justify-start items-center gap-5">
          <div className="relative rounded-3xl w-52 h-36 bg-[#FFFFFF99] overflow-hidden">
            <Image
              className="object-cover"
              src=""
              fill
              alt="Image of project"
            />
          </div>
          <div className="h-36 w-2/3 flex flex-col justify-center">
            <div>
              <span className="text-md">
                {`${
                  sorted.find((project) => project.slug === "portfolio")?.title
                }`}
              </span>
              <a
                href={
                  sorted.find((project) => project.slug === "portfolio")?.url
                }
              >
                github
              </a>{" "}
              <a
                href={
                  sorted.find((project) => project.slug === "portfolio")?.url
                }
              >
                website
              </a>
              <p className="text-sm">
                {
                  sorted.find((project) => project.slug === "portfolio")
                    ?.description
                }
              </p>
            </div>
            <div className="text-xs">
              {`
              ${views["portfolio"] ?? 0} views 
              ·
              ${format(
                sorted.find((project) => project.slug === "portfolio")
                  ?.startDate!,
                "M.yy"
              )} -
              ${
                sorted.find((project) => project.slug === "portfolio")?.endDate
                  ? format(
                      sorted.find((project) => project.slug === "portfolio")
                        ?.endDate!,
                      "mm.yyyy"
                    )
                  : "Present"
              } 
              ·
              ${sorted
                .find((project) => project.slug === "portfolio")
                ?.tags?.join(", ")}`}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div> */}
    </div>
  );
}
