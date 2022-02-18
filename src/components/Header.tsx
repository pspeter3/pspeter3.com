import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Social } from "./Social";
import author from "../config/author.json";

export const Header: FC = () => (
  <header className="flex justify-between border-b border-gray-200 py-3 dark:border-gray-700">
    <Link href="/">
      <a
        className="group flex space-x-4 focus:outline-none"
        itemProp="author"
        itemScope
        itemType="http://schema.org/Person"
      >
        <div className="h-12 w-12">
          <Image
            src="/img/profile.jpg"
            alt={author.name}
            itemProp="image"
            width={48}
            height={48}
            className="rounded-full"
          ></Image>
        </div>
        <div className="author__details">
          <p
            className="block text-lg font-bold text-gray-900 group-hover:text-sky-900 group-focus:underline dark:text-gray-200 dark:group-hover:text-sky-200"
            itemProp="name"
          >
            Phips Peter
          </p>
          <p className="text-sm text-gray-500 group-hover:text-sky-500 dark:text-gray-400 dark:group-hover:text-sky-400">
            @pspeter3
          </p>
        </div>
      </a>
    </Link>
    <Social hide />
  </header>
);
