import React, { FC } from "react";
import Link from "next/link";
import { FileText } from "react-feather";
import * as author from "../config/author.json";
import { parseDate, toISODate, toSlug } from "../tools/utils";
import { BlogPost } from "../tools/blog";

export const Post: FC<Omit<BlogPost, "content" | "tags">> = ({
    basename,
    title,
}) => {
    const date = parseDate(basename);
    const url = `/blog/${toSlug(basename)}`;
    return (
        <article
            className="post"
            itemScope
            itemType="http://schema.org/BlogPosting"
        >
            <Link href={url}>
                <a className="post__container" itemProp="url">
                    <div className="post__icon">
                        <FileText />
                    </div>
                    <div className="post__data">
                        <h2 className="post__title" itemProp="headline">
                            {title}
                        </h2>
                        <p className="post__date" itemProp="datePublished">
                            {toISODate(date)}
                        </p>
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
