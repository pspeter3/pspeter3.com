import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "../../components/CodeBlock";
import { Header } from "../../components/Header";
import { Meta } from "../../components/Meta";
import { BlogPost, loadBlogPosts } from "../../tools/blog";
import { parseDate, toISODate, toSlug } from "../../tools/utils";

export type Props = BlogPost;

export const getStaticProps: GetStaticProps<Props, { slug: string[] }> =
    async ({ params }) => {
        const blog = await loadBlogPosts();
        const { slug } = params!;
        const basename = slug.join("-");
        const props = blog.find((post) => post.basename === basename);
        if (!props) {
            throw new Error(`Could not find ${basename}`);
        }
        return { props };
    };

export const getStaticPaths: GetStaticPaths = async () => {
    const blog = await loadBlogPosts();
    const paths = blog.map((post) => {
        return { params: { slug: toSlug(post.basename).split("/") } };
    });
    return { paths, fallback: false };
};

const ArticlePage: NextPage<Props> = (post) => (
    <main
        className="mx-auto pb-6 px-4 max-w-2xl space-y-6"
        itemScope
        itemType="http://schema.org/BlogPosting"
    >
        <Meta title={post.title} description="" />
        <Header />
        <article className="prose prose-sky dark:prose-invert max-w-none">
            <header>
                <time
                    className="dark:text-gray-400 text-gray-500 font-semibold"
                    dateTime={toISODate(parseDate(post.basename))}
                    itemProp="datePublished"
                >
                    {toISODate(parseDate(post.basename))}
                </time>
                <h1 itemProp="headline">{post.title}</h1>
            </header>
            <ReactMarkdown
                plugins={[remarkGfm]}
                components={{ code: CodeBlock }}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    </main>
);

export default ArticlePage;
