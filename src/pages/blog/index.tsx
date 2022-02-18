import { NextPage, GetStaticProps } from "next";
import { Header } from "../../components/Header";
import { Meta } from "../../components/Meta";
import { PostList } from "../../components/PostList";
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
    <main className="mx-auto max-w-2xl space-y-6 px-4 pb-6">
      <Meta title={title} description={description}></Meta>
      <Header />
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200">
        {title}
      </h1>
      {years.map((year) => (
        <PostList key={year} title={year} posts={posts[year]} />
      ))}
    </main>
  );
};

export default BlogPage;
