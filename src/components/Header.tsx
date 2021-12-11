import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Social } from "./Social";
import author from "../config/author.json";

export const Header: FC = () => (
    <header className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <Link href="/">
            <a
                className="group flex focus:outline-none space-x-4"
                itemProp="author"
                itemScope
                itemType="http://schema.org/Person"
            >
                <div className="w-12 h-12">
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
                        className="dark:group-hover:text-sky-200 block group-hover:text-sky-900 dark:text-gray-200 text-gray-900 group-focus:underline text-lg font-bold"
                        itemProp="name"
                    >
                        Phips Peter
                    </p>
                    <p className="dark:group-hover:text-sky-400 group-hover:text-sky-500 dark:text-gray-400 text-gray-500 text-sm">
                        @pspeter3
                    </p>
                </div>
            </a>
        </Link>
        <Social hide />
    </header>
);
