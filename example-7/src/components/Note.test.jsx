import { render, screen } from "@testing-library/react";
import Note from "./Note";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

test("render content", () => {
  const note = {
    content: "Does not work anymore :(",
    important: true,
  };

  const { container } = render(<Note note={note} />);

  const element = screen.getByText("Does not work anymore :(", {
    exact: false,
  });
  expect(element).toBeDefined();
});
test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("does not render this ", () => {
  const note = {
    content: "This is a reminder",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});
