import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("should render the title", () => {
    const title = "Hello World!";
    render(<Header title={title} />);
    expect(screen.queryByText(title)).not.toBeNull();
  });
});
