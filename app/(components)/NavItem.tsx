"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export const NavItem = ({
  item,
}: {
  item: { active: boolean; display: string; link: string };
}) => {
  return (
    <li className="w-max" key={item.display}>
      <motion.div whileHover={{ x: 5 }}>
        <Link href={item.link} className="opacity-80 hover:opacity-100">
          {item.display}
        </Link>
      </motion.div>
    </li>
  );
};
