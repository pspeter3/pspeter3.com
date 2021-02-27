import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Social } from "./Social";
import * as author from "../config/author.json";

export const Header: FC = () => (
    <header className="flex justify-between py-3 border-b">
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
                        className="block group-hover:text-blue-900 text-gray-900 group-focus:underline text-lg font-bold"
                        itemProp="name"
                    >
                        Phips Peter
                    </p>
                    <p className="group-hover:text-blue-500 text-gray-500 text-sm">
                        @pspeter3
                    </p>
                </div>
            </a>
        </Link>
        <Social hide />
    </header>
);
