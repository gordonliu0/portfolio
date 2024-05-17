import React from "react";
import { Project as ProjectType } from "@/.contentlayer/generated";
import Image from "next/image";
import { Eye, Github } from "lucide-react";
import { format } from "date-fns";

type Props = {
  project: ProjectType;
  views: number;
};

export const Project = ({ project, views }: Props) => {
  return (
    <div className="flex flex-row justify-start items-center gap-5">
      <div className="relative rounded-3xl w-52 h-36 bg-[#FFFFFF99] overflow-hidden">
        <Image className="object-cover" src="" fill alt="Image of project" />
      </div>
      <div className="h-36 w-2/3 flex flex-col justify-center">
        <div>
          <span className="text-md">{`${project.title}`}</span>
          <a href={project.url}>github</a> <a href={project.url}>website</a>
          <p className="text-sm">{project.description}</p>
        </div>
        <div className="text-xs">
          {`${views} views · ${format(project.startDate, "M.yy")} - ${
            project.endDate ? format(project.endDate!, "mm.yyyy") : "Present"
          } · ${project.tags?.join(", ")}`}
        </div>
      </div>
    </div>
  );
};
