import React, { FC } from "react";
import * as author from "../config/author.json";

export const Profile: FC = () => (
  <header className="profile">
    <img src="/img/profile.jpg" alt={author.name} className="profile__avatar" />
    <div className="profile__details">
      <h1 className="profile__name">{author.name}</h1>
      <h2 className="profile__username">{author.twitter}</h2>
    </div>
  </header>
);
