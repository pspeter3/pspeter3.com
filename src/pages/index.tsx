import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { Social } from "../components/Social";
import { Meta } from "../components/Meta";
import * as author from "../config/author.json";
import { BlogPost, loadBlogPosts } from "../tools/blog";
import { reverseChronological } from "../tools/utils";
import { Post } from "../components/Post";
import { FC } from "react";

export interface Props {
    readonly posts: ReadonlyArray<BlogPost>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const blog = await loadBlogPosts();
    const posts = blog.sort(reverseChronological).slice(0, 3);
    const props: Props = { posts };
    return { props };
};

const IntroLink: FC<{ href: string; children: string }> = ({
    href,
    children,
}) => (
    <Link href={href}>
        <a className="text-blue-600 focus:underline focus:outline-none">
            {children}
        </a>
    </Link>
);

const IndexPage: NextPage<Props> = ({ posts }) => (
    <>
        <Meta title="pspeter3" description={author.name}></Meta>
        <div className="relative h-72">
            <Image
                src="/img/cover.jpg"
                alt="New Zealand Beach"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            ></Image>
        </div>
        <main className="max-w-2xl mx-auto px-4 pb-6">
            <header className="flex border-b space-x-4 py-4">
                <div className="relative z-10 -mt-16 rounded-full ring-4 ring-white">
                    <Image
                        src="/img/profile.jpg"
                        alt={author.name}
                        width={128}
                        height={128}
                        className="rounded-full"
                    ></Image>
                </div>
                <div className="space-y-1">
                    <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
                        {author.name}
                    </h1>
                    <p className="text-gray-500 text-lg">{author.twitter}</p>
                </div>
            </header>
            <section className="py-6 mb-6">
                <p className="text-gray-600 text-xl leading-8 ">
                    Adoption Pillar Tech Lead at{" "}
                    <IntroLink href="https://asana.com">Asana</IntroLink>.
                    Author of the{" "}
                    <IntroLink href="https://www.npmjs.com/package/@types/react">
                        React Typescript
                    </IntroLink>{" "}
                    definitions. Organizer of the{" "}
                    <IntroLink href="https://www.meetup.com/typescript-react/">
                        TypeScript React Meetup
                    </IntroLink>
                    .
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-gray-500 uppercase text-sm tracking-wide leading-6">
                    Recent Posts
                </h2>
                <ul className="divide-y">
                    {posts.map((post) => (
                        <li key={post.basename}>
                            <Post basename={post.basename} title={post.title} />
                        </li>
                    ))}
                </ul>
            </section>
            <footer>
                <Social />
            </footer>
        </main>
    </>
);

export default IndexPage;
