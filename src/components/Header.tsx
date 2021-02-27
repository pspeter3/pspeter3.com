import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Social } from "./Social";
import * as author from "../config/author.json";

export const Header: FC = () => (
    <header className="py-3 flex justify-between border-b">
        <Link href="/">
            <a
                className="focus:outline-none group flex space-x-4"
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
                        className="text-gray-900 block text-lg font-bold group-hover:text-blue-900 group-focus:underline"
                        itemProp="name"
                    >
                        Phips Peter
                    </p>
                    <p className="text-gray-500  text-sm  group-hover:text-blue-500">
                        @pspeter3
                    </p>
                </div>
            </a>
        </Link>
        <Social hide />
    </header>
);
