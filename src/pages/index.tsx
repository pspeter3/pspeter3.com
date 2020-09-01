import React from "react";
import { NextPage } from "next";
import { Social } from "../components/Social";

const IndexPage: NextPage = () => (
  <>
    <img src="/img/cover.jpg" alt="New Zealand Beach" className="cover" />
    <main className="content">
      <header className="profile">
        <img
          src="/img/profile.jpg"
          alt="Phips Peter"
          className="profile__avatar"
        />
        <div className="profile__details">
          <h1 className="profile__name">Phips Peter</h1>
          <h2 className="profile__username">@pspeter3</h2>
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
      </section>
      <footer>
        <Social />
      </footer>
    </main>
  </>
);

export default IndexPage;
