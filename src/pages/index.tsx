import { NextPage, GetStaticProps } from "next";
import { Social } from "../components/Social";
import { Meta } from "../components/Meta";
import * as author from "../config/author.json";
import { BlogPost, loadBlogPosts } from "../tools/blog";
import { parseBasename, reverseChronological } from "../tools/utils";
import { Post } from "../components/Post";

export interface Props {
  readonly posts: ReadonlyArray<BlogPost>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blog = await loadBlogPosts();
  const posts = blog.sort(reverseChronological).slice(0, 3);
  const props: Props = { posts };
  return { props };
};

const IndexPage: NextPage<Props> = ({ posts }) => (
  <>
    <Meta title="pspeter3" description={author.name}></Meta>
    <img src="/img/cover.jpg" alt="New Zealand Beach" className="cover" />
    <main className="content">
      <header className="profile">
        <img
          src="/img/profile.jpg"
          alt={author.name}
          className="profile__avatar"
        />
        <div className="profile__details">
          <h1 className="profile__name">{author.name}</h1>
          <h2 className="profile__username">{author.twitter}</h2>
        </div>
      </header>
      <section className="bio">
        Tech Lead for the Adoption teams at{" "}
        <a href="https://asana.com">Asana</a>. Author of the{" "}
        <a href="https://www.npmjs.com/package/@types/react">
          React TypeScript
        </a>{" "}
        definitions. Organizer of the{" "}
        <a href="https://www.meetup.com/typescript-react/">
          TypeScript React Meetup
        </a>
        .
      </section>
      <section className="recent">
        <h1 className="recent__title">Recent Posts</h1>
        {posts.map((post) => (
          <Post key={post.basename} {...post} />
        ))}
      </section>
      <footer>
        <Social />
      </footer>
    </main>
  </>
);

export default IndexPage;
