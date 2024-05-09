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
    <div className="w-full h-full flex flex-col items-start justify-center gap-6 px-24 py-12">
      <div className="w-6 h-6 relative">
        <Image
          src={"/profile.jpg"}
          alt={"Profile Picture"}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <h2 className="z-10 text-lg cursor-default font-medium space tracking-tight w-2/3">
        Hi, I'm Gordon Liu. My guiding mission is to empower individuals to
        bring their ideas to life. Right now, I'm a machine learning researcher
        focused on agent interactions and code synthesis.
      </h2>
      <div className="flex flex-col items-start justify-center gap-4 text-sm font-light leading-5">
        <h2>
          Through my life, I've explored many domains, including including
          full-stack development, theoretical math, startups, and roofing (yes,
          the covering above you right now), and hopefully many more to come. I
          believe human intelligence is at its most brilliant when its able to
          distill experience in disparate fields into useful generalizations
          applicable to all; also - it's just fun.
        </h2>
        <h2>
          I try to balance thinking how to drive the world into the future and
          how to live in the present. I like reading, writing, good food, yerba
          mate, and running. Some hobbies on the backburner include piano, music
          production, and gaming. With my writing, I hope I can stimulate
          critical thinking and provide useful insights through my expereinces.
          Finally, feel free to reach out for whatever reason (literally!).
        </h2>
      </div>
      <div className="flex flex-row justify-between w-full border-b border-black border-opacity-10">
        <input
          className="bg-transparent w-full outline-none text-sm"
          placeholder="email@gmail.com"
        ></input>
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
