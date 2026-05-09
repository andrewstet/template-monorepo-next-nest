import { render, screen } from "@testing-library/react";
import { ExampleForm } from "./example-form";

// This test exists to confirm that Vitest and RTL are working as expected.
// TODO: Delete this once you start building off of this template
describe("ExampleForm", () => {
  it("renders", () => {
    render(<ExampleForm />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
