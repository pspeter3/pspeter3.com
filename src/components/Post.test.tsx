import { render, screen } from "@testing-library/react";
import { Post } from "./Post";

describe("Post", () => {
  it("should have title", () => {
    const title = "Hello World!";
    render(<Post title={title} url="/hello-world" date={new Date()} />);
    expect(screen.queryByText(title)).not.toBeNull();
  });

  it("should have date", () => {
    const date = new Date("2020-08-31");
    render(<Post title="Hello World!" url="/hello-world" date={date} />);
    expect(screen.queryByText("2020-08-31")).not.toBeNull();
  });
});
