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
        <main className="content">
            <Meta title={title} description={description}></Meta>
            <Header title={title} />
            {years.map((year) => (
                <section key={year} className="group">
                    <h2 className="group__title">{year}</h2>
                    {posts[year].map((post) => (
                        <Post key={post.basename} {...post} />
                    ))}
                </section>
            ))}
        </main>
    );
};

export default BlogPage;
