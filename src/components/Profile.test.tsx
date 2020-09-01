import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";
import * as author from "../config/author.json";

describe("Profile", () => {
  it("should have name", () => {
    render(<Profile />);
    expect(screen.queryByText(author.name)).not.toBeNull();
  });

  it("should have twitter", () => {
    render(<Profile />);
    expect(screen.queryByText(author.twitter)).not.toBeNull();
  });
});
