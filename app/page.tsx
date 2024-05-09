import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Instagram, Github } from "lucide-react";

const navigation = [{ name: "Projects", href: "/projects" }];

const socials = [
  { icon: <Instagram size={16} />, href: "https://www.instagram.com/gg1iu" },
  { icon: <Github size={16} />, href: "https://github.com/gordonliu0" },
];

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-6 p-24">
      <div className="w-10 h-10 relative">
        <Image
          src={"/profile.jpg"}
          alt={"Profile Picture"}
          fill
          className="object-cover rounded-full "
        />
      </div>
      <h2 className="z-10 text-lg cursor-default font-medium space tracking-tight w-1/2">
        Hi, I'm Gordon Liu. I'm a machine learning researcher focused on agent
        interactions and code synthesis. My mission is to enable individuals to
        bring their big ideas to life.
      </h2>
      <div className="flex flex-col items-start justify-center gap-4 text-sm font-light leading-5">
        <h2>
          Some of my interests include full-stack development, data science,
          AI/ML, pure math, and startups. With a deep-rooted passion for
          learning, I have always voraciously applied theory to solve real world
          issues.
        </h2>
        <h2>Thanks for stopping by! Feel free to contact me above. ☺️</h2>
      </div>
      <div className="flex flex-row justify-between w-full border-b border-black">
        <input className="bg-transparent w-full outline-none text-sm"></input>
        <div>→</div>
      </div>
      <div>✌️</div>
      <div className="relative top-16 left-8 flex flex-row w-full items-end justify-end gap-4">
        {socials.map((item) => (
          <a key={item.href} href={item.href} className="w-3 h-3">
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
