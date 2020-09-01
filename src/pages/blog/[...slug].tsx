import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Calendar } from "react-feather";
import ReactMarkdown from "react-markdown";
import { Header } from "../../components/Header";
import { BlogPost, loadBlogPosts } from "../../tools/blog";
import { parseDate, toISODate, toSlug } from "../../tools/utils";

export type Props = BlogPost;

export const getStaticProps: GetStaticProps<
  Props,
  { slug: string[] }
> = async ({ params }) => {
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
  <main className="content" itemScope itemType="http://schema.org/BlogPosting">
    <Header title={post.title}></Header>
    <section className="article__date" itemProp="datePublished">
      <Calendar className="feather"/>
      {toISODate(parseDate(post.basename))}
    </section>
    <section className="article" itemProp="articleBody">
      <ReactMarkdown source={post.content}></ReactMarkdown>
    </section>
  </main>
);

export default ArticlePage;
