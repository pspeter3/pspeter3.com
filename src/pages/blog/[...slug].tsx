import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Calendar } from "react-feather";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../../components/CodeBlock";
import { Header } from "../../components/Header";
import { Meta } from "../../components/Meta";
import { BlogPost, loadBlogPosts } from "../../tools/blog";
import { parseDate, toISODate, toSlug } from "../../tools/utils";

export type Props = BlogPost;

export const getStaticProps: GetStaticProps<
    Props,
    { slug: string[] }
> = async ({ params }) => {
    const blog = await loadBlogPosts();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        className="max-w-2xl mx-auto px-4 pb-6 space-y-6"
        itemScope
        itemType="http://schema.org/BlogPosting"
    >
        <Meta title={post.title} description="" />
        <Header />
        <article className="prose max-w-none prose-blue">
            <header>
                <time
                    className="text-lg text-gray-500 flex space-x-2 items-center mb-1"
                    dateTime={toISODate(parseDate(post.basename))}
                    itemProp="datePublished"
                >
                    <Calendar size={20} className="text-gray-400" />
                    <span>{toISODate(parseDate(post.basename))}</span>
                </time>
                <h1 itemProp="headline">{post.title}</h1>
            </header>
            <ReactMarkdown
                source={post.content}
                renderers={{ code: CodeBlock }}
            ></ReactMarkdown>
        </article>
    </main>
);

export default ArticlePage;
