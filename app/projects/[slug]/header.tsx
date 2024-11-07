"use client";
import { Project } from "@/.contentlayer/generated";
import { format } from "date-fns";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  project: Project;
  views: number;
};

export const Header: React.FC<Props> = ({ project, views }) => {
  const links: { label: string; href: string }[] = [];

  if (project.repository) {
    links.push({
      label: "GitHub",
      href: project.repository,
    });
  }
  if (project.url) {
    links.push({
      label: "Website",
      href: project.url,
    });
  }

  return (
    <div className="flex flex-col items-start">
      <Link
        href="/projects"
        className={`text-sm text-zinc-900 mb-12 duration-200 hover:font-medium hover:underline
						} `}
      >
        <div className="flex flex-row gap-2 items-center">
          <ArrowLeft className="w-4 h-4" /> Back to main
        </div>
      </Link>
      <p className="text-xs text-gray-700">{`${Intl.NumberFormat("en-US", {
        notation: "compact",
      }).format(views)} Views | Updated ${format(
        project.date!,
        "MMM dd, yyyy"
      )}`}</p>
      <h1 className="font-bold tracking-tight text-4xl font-display">
        {project.title}
      </h1>
      <p className="text-md">{project.description}</p>
      <div className="mt-4 flex flex-col gap-1 text-sm underline underline-offset-4 font-medium">
        {links.map((link) => (
          <Link target="_blank" key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
