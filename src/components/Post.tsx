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
                    className="group py-6 flex space-x-4 focus:outline-none"
                    itemProp="url"
                >
                    <div className="h-12 w-12 bg-gray-100 group-hover:bg-blue-100 rounded-2xl text-gray-400 group-hover:text-blue-400 flex items-center justify-center flex-shrink-0">
                        <FileText />
                    </div>
                    <div>
                        <h3
                            className="text-gray-900 font-medium group-hover:text-blue-900 group-focus:underline"
                            itemProp="headline"
                        >
                            {title}
                        </h3>
                        <time
                            className="text-gray-500 block group-hover:text-blue-500"
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
