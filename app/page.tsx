"use client";

import React from "react";
import { Instagram, Github } from "lucide-react";
import Link from "next/link";

const socials = [
  { icon: <Instagram size={16} />, href: "https://www.instagram.com/gg1iu" },
  { icon: <Github size={16} />, href: "https://github.com/gordonliu0" },
];

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start my-24 sm:justify-center sm:my-0 gap-6 relative">
      <h2 className="text-lg font-medium space tracking-tight">
        Hi! I'm Gordon Liu, a machine learning researcher, software engineer,
        and startup founder.
      </h2>
      <div className="flex flex-col items-start justify-center gap-4 text-sm font-light leading-5">
        <h2>
          I've always been fascinated by how different fields of knowledge
          connect in unexpected ways.
        </h2>
        <h2>
          This is a space dedicated to sharing and exploring ideas. One of my
          guiding principles is that both theoretical rigor and uninhibited
          practical experimentation is needed to reach breakthroughs. You'll
          find this philosophy throughout my projects, research, and writing.
        </h2>
        <h2>
          Some topics I'm currently interested in include:
          <ul className="pl-4">
            <li>Vision transformers</li>
            <li>Cloud GPU deployment optimization</li>
            <li>Finetuning foundation models</li>
          </ul>
          {/* {"For detailed updates, see "}
          <Link href="/lab" className="underline">
            lab
          </Link> */}
          {". For past projects, see "}
          <Link href="/projects" className="underline">
            projects
          </Link>
          {"."}
          {/* {". For book summaries and essays, see "}
          <Link href="/books" className="underline">
            books
          </Link>
          {" and "}
          <Link href="/writing" className="underline">
            writing
          </Link>
          {" respectively."} */}
        </h2>
      </div>
      <div className="text-sm font-light">
        I hope this place sparks ideas for your own ambitious builds. If you're
        interested in research collaboration, technical projects, or startups,
        feel free to reach out at gordonliu1106@gmail.com ✌️
      </div>
      <div className="w-full h-min relative">
        <div className="flex flex-row w-full items-start justify-start gap-4">
          {socials.map((item) => (
            <a key={item.href} href={item.href} className="w-3 h-3">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
