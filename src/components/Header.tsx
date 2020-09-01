import React, { FC } from "react";
import Link from "next/link";
import { Social } from "./Social";

export const Header: FC<{ title: string }> = ({ title }) => (
    <header className="content__header">
        <div className="content__metadata">
            <Link href="/">
                <a
                    className="author"
                    itemProp="author"
                    itemScope
                    itemType="http://schema.org/Person"
                >
                    <img
                        src="/img/profile.jpg"
                        alt="Phips Peter"
                        className="author__avatar"
                        itemProp="image"
                    />
                    <div className="author__details">
                        <h1 className="author__name" itemProp="name">
                            Phips Peter
                        </h1>
                        <h2 className="author__username">@pspeter3</h2>
                    </div>
                </a>
            </Link>
            <Social />
        </div>
        <h1 className="content__title" itemProp="headline">
            {title}
        </h1>
    </header>
);
