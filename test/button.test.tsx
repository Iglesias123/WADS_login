import { render, screen } from "@testing-library/react";
import { Button } from "../components/ui/button";

describe("Button Component", () => {
  test("renders button with correct label", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
});
