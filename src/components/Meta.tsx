import React, { FC } from "react";
import Head from "next/head";
import * as author from "../config/author.json";

export const Meta: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <title>{title}</title>
    <meta name="theme-color" content="#1c1d1f" />
    <meta name="description" content={description} />
    <link rel="author" href={author.site} />
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    <meta name="twitter:dnt" content="on" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={author.twitter} />
    <meta name="twitter:url" content="" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Head>
);
