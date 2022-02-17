import { FC } from "react";
import { BlogPost } from "../tools/blog";
import { Post } from "./Post";

export const PostList: FC<{
    title: string;
    posts: ReadonlyArray<Pick<BlogPost, "basename" | "title">>;
}> = ({ title, posts }) => (
    <section>
        <h2 className="text-sm uppercase leading-6 tracking-wide text-gray-500 dark:text-gray-400">
            {title}
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
                <li key={post.basename}>
                    <Post basename={post.basename} title={post.title} />
                </li>
            ))}
        </ul>
    </section>
);
