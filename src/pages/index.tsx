import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Social } from "../components/Social";
import { Meta } from "../components/Meta";
import author from "../config/author.json";
import { BlogPost, loadBlogPosts } from "../tools/blog";
import { reverseChronological } from "../tools/utils";
import { FC } from "react";
import { PostList } from "../components/PostList";

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
        <a className="dark:text-sky-300 text-sky-600 focus:underline focus:outline-none">
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
        <main className="mx-auto pb-6 px-4 max-w-2xl space-y-6">
            <header className="flex py-4 border-b border-gray-200 dark:border-gray-700 space-x-4">
                <div className="relative z-10 flex-shrink-0 -mt-16 rounded-full ring-4 dark:ring-gray-900 ring-white">
                    <Image
                        src="/img/profile.jpg"
                        alt={author.name}
                        width={128}
                        height={128}
                        className="rounded-full"
                    ></Image>
                </div>
                <div className="space-y-1">
                    <h1 className="dark:text-gray-200 text-gray-900 text-2xl font-bold tracking-tight">
                        {author.name}
                    </h1>
                    <p className="dark:text-gray-400 text-gray-500 text-lg">
                        {author.twitter}
                    </p>
                </div>
            </header>
            <section className="pb-6">
                <p className="dark:text-gray-300 text-gray-600 text-xl leading-8">
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
            <PostList title="Recent Posts" posts={posts} />
            <footer>
                <Social />
            </footer>
        </main>
    </>
);

export default IndexPage;
