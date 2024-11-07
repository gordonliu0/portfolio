"use client";

import React, { useEffect, useState } from "react";
import { NavItem } from "./NavItem";

const nav = [
  {
    active: true,
    display: "gordon liu",
    link: "/",
  },
  {
    active: true,
    display: "projects",
    link: "/projects",
  },
  {
    active: false,
    display: "lab",
    link: "/lab",
  },
  {
    active: true,
    display: "books",
    link: "/bookshelf",
  },
  {
    active: false,
    display: "writing",
    link: "/writing",
  },
  {
    active: false,
    display: "collaboration",
    link: "/collaboration",
  },
  {
    active: false,
    display: "RESEARCH",
    link: "/research",
  },
];
const CLOSE_DISTANCE = 192;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const [unopened, setUnopened] = useState(true);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Auto-close when mouse is far from navbar
      if (isOpen && e.clientX > CLOSE_DISTANCE) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  // Detect hover zone
  useEffect(() => {
    if (mousePosition.x <= 30 && !isOpen) {
      setIsOpen(true);
      setUnopened(false);
    }
  }, [mousePosition]);

  return (
    <div className="absolute z-30 h-full">
      <div
        className={`pl-4 h-full flex flex-col justify-center absolute transition-all duration-300 ease-out animate-pulse ${
          isOpen || !unopened ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        👈
      </div>

      <div
        className={`absolute z-30 w-48 h-full w-xl bg-white bg-opacity-25 rounded-r-3xl shadow-2xl 
        transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col py-8 px-4 gap-2 w-full text-white text-2xl font-semibold">
          {nav
            .slice(0, 1)
            .map((item) => item.active && <NavItem item={item} />)}
          <div className="h-2" />
          {nav.slice(1).map((item) => item.active && <NavItem item={item} />)}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
