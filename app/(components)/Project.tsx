import React from "react";
import { Project as ProjectType } from "@/.contentlayer/generated";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  project: ProjectType;
  views: number;
  hasImage: boolean;
};

export const Project = ({ project, views, hasImage }: Props) => {
  return (
    <Link
      key={project.slug}
      className="w-full flex flex-row justify-start items-center"
      href={`/projects/${project.slug}`}
    >
      {hasImage && (
        <div className="relative rounded-3xl w-52 h-36 bg-[#FFFFFF99] overflow-hidden">
          <Image className="object-cover" src="" fill alt="Image of project" />
        </div>
      )}

      <div className="w-2/3 flex flex-col justify-center">
        <div>
          <span className="font-semibold text-md">{`${project.title}`}</span>
          {/* <a href={project.url}>
            <Github />
          </a>{" "}
          <a href={project.url}>
            <ExternalLink />
          </a> */}
          <p className="text-sm">{project.description}</p>
        </div>
        <div className="text-xs mt-1">
          {`${views} views · ${format(project.startDate, "M.yy")} - ${
            project.endDate ? format(project.endDate!, "mm.yyyy") : "Present"
          } · ${project.tags?.join(", ")}`}
        </div>
      </div>
    </Link>
  );
};
