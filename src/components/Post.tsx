import React, { FC } from "react";
import Link from "next/link";
import { FileText } from "react-feather";
import * as author from "../config/author.json";
import { parseDate, toISODate, toSlug } from "../tools/utils";
import { BlogPost } from "../tools/blog";

export const Post: FC<Pick<BlogPost, "basename" | "title">> = ({
    basename,
    title,
}) => {
    const date = parseDate(basename);
    const url = `/blog/${toSlug(basename)}`;
    const iso = toISODate(date);
    return (
        <article itemScope itemType="http://schema.org/BlogPosting">
            <Link href={url}>
                <a
                    className="group flex py-6 focus:outline-none space-x-4"
                    itemProp="url"
                >
                    <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 group-hover:text-blue-400 text-gray-400 group-hover:bg-blue-100 bg-gray-100 rounded-2xl">
                        <FileText />
                    </div>
                    <div>
                        <h3
                            className="group-hover:text-blue-900 text-gray-900 group-focus:underline font-medium"
                            itemProp="headline"
                        >
                            {title}
                        </h3>
                        <time
                            className="block group-hover:text-blue-500 text-gray-500"
                            dateTime={iso}
                            itemProp="datePublished"
                        >
                            {iso}
                        </time>
                    </div>
                    <div
                        className="hidden"
                        itemProp="author"
                        itemScope
                        itemType="http://schema.org/Person"
                    >
                        <meta itemProp="name" content={author.name} />
                    </div>
                </a>
            </Link>
        </article>
    );
};
