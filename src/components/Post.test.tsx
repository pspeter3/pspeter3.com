import { render, screen } from "@testing-library/react";
import { Post } from "./Post";

describe("Post", () => {
  it("should have title", () => {
    const title = "Hello World!";
    render(<Post title={title} basename="2020-09-01-hello-world" />);
    expect(screen.queryByText(title)).not.toBeNull();
  });

  it("should have date", () => {
    const date = "2020-09-01";
    render(<Post title="Hello World!" basename={`${date}-hello-world`} />);
    expect(screen.queryByText(date)).not.toBeNull();
  });
});
