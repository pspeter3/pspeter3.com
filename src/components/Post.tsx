import React, { FC } from "react";
import Link from "next/link";
import { FileText } from "react-feather";
import author from "../config/author.json";
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
                    <div className="dark:group-hover:bg-sky-800 dark:hover:text-sky-500 flex flex-shrink-0 items-center justify-center w-12 h-12 group-hover:text-sky-400 text-gray-400 dark:text-gray-500 group-hover:bg-sky-100 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                        <FileText />
                    </div>
                    <div>
                        <h3
                            className="dark:group-hover:text-sky-200 group-hover:text-sky-900 dark:text-gray-200 text-gray-900 group-focus:underline font-medium"
                            itemProp="headline"
                        >
                            {title}
                        </h3>
                        <time
                            className="dark:group-hover:text-sky-400 block group-hover:text-sky-500 dark:text-gray-400 text-gray-500"
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
