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
                    className="group flex space-x-4 py-6 focus:outline-none"
                    itemProp="url"
                >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 group-hover:bg-sky-100 group-hover:text-sky-400 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-sky-500 dark:group-hover:bg-sky-800">
                        <FileText />
                    </div>
                    <div>
                        <h3
                            className="font-medium text-gray-900 group-hover:text-sky-900 group-focus:underline dark:text-gray-200 dark:group-hover:text-sky-200"
                            itemProp="headline"
                        >
                            {title}
                        </h3>
                        <time
                            className="block text-gray-500 group-hover:text-sky-500 dark:text-gray-400 dark:group-hover:text-sky-400"
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
