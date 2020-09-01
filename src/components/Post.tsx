import React, { FC } from "react";
import Link from "next/link";
import { FileText } from "react-feather";
import * as author from "../config/author.json";

export const Post: FC<{ title: string; url: string; date: Date }> = ({
  title,
  url,
  date,
}) => (
  <article className="post" itemScope itemType="http://schema.org/BlogPosting">
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
            {date.toISOString().split("T")[0]}
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
