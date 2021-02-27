import { NextPage, GetStaticProps } from "next";
import { Header } from "../../components/Header";
import { Meta } from "../../components/Meta";
import { Post } from "../../components/Post";
import { BlogPost, loadBlogPosts } from "../../tools/blog";
import { parseDate, reverseChronological } from "../../tools/utils";

export type Props = Readonly<Record<string, ReadonlyArray<BlogPost>>>;

export const getStaticProps: GetStaticProps<Props> = async () => {
    const blog = await loadBlogPosts();
    const props = blog.sort(reverseChronological).reduce((posts, post) => {
        const year = parseDate(post.basename).getFullYear().toString();
        if (!posts[year]) {
            posts[year] = [];
        }
        posts[year].push(post);
        return posts;
    }, {} as Record<string, BlogPost[]>);
    return { props };
};

const BlogPage: NextPage<Props> = (posts) => {
    const title = "Blog";
    const description = "Phips Peter's Blog";
    const years = Object.keys(posts).sort().reverse();
    return (
        <main className="max-w-2xl mx-auto px-4 pb-6 space-y-6">
            <Meta title={title} description={description}></Meta>
            <Header />
            <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight">
                {title}
            </h1>
            {years.map((year) => (
                <section key={year}>
                    <h2 className="text-gray-500 uppercase text-sm tracking-wide leading-6">
                        {year}
                    </h2>
                    <ul className="divide-y">
                        {posts[year].map((post) => (
                            <li key={post.basename}>
                                <Post
                                    basename={post.basename}
                                    title={post.title}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
};

export default BlogPage;
