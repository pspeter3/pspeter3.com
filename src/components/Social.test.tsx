import { render, screen } from "@testing-library/react";
import { Social } from "./Social";

describe("Social", () => {
    it("should have a link to the blog", () => {
        render(<Social />);
        expect(screen.queryByLabelText("Blog")).not.toBeNull();
    });

    it("should have a link to Github", () => {
        render(<Social />);
        expect(screen.queryByLabelText("Github")).not.toBeNull();
    });

    it("should have a link to Twitter", () => {
        render(<Social />);
        expect(screen.queryByLabelText("Twitter")).not.toBeNull();
    });

    it("should have a link to LinkedIn", () => {
        render(<Social />);
        expect(screen.queryByLabelText("LinkedIn")).not.toBeNull();
    });
});
