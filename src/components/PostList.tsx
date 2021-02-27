import { FC } from "react";
import { BlogPost } from "../tools/blog";
import { Post } from "./Post";

export const PostList: FC<{
    title: string;
    posts: ReadonlyArray<Pick<BlogPost, "basename" | "title">>;
}> = ({ title, posts }) => (
    <section>
        <h2 className="dark:text-gray-400 text-gray-500 text-sm tracking-wide leading-6 uppercase">
            {title}
        </h2>
        <ul className="divide-gray-200 dark:divide-gray-700 divide-y">
            {posts.map((post) => (
                <li key={post.basename}>
                    <Post basename={post.basename} title={post.title} />
                </li>
            ))}
        </ul>
    </section>
);
