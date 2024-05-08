"use client";

import React, { useState } from "react";
import { NavigationButton } from "./NavigationButton";

const links = [
  {
    title: "Projects",
    href: "/",
  },
  {
    title: "Agency",
    href: "/",
  },
  {
    title: "Expertise",
    href: "/",
  },
];

export const Navigation = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div
      className={
        isActive
          ? "fixed bg-[#c9fd74] rounded-2xl w-[100px] h-[400px] top-25 right-25 transition-all"
          : "fixed w-[10px] h-[10px] top-0 r-0 transition-all"
      }
    >
      {isActive &&
        links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={""}>
              <a>{title}</a>
            </div>
          );
        })}
      <NavigationButton
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
};
