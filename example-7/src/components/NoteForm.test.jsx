import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

describe("<NoteForm />", () => {
  test("updates parent state and calls onSubmit", async () => {
    // Help us creating a mock note
    const createNote = vi.fn();
    // create user for user interaction
    const user = userEvent.setup();

    // render the noteForm
    render(<NoteForm createNote={createNote} />);

    // get the textbox mean the input
    const input = screen.getByPlaceholderText("write note content here");
    // get the save button
    const sendButton = screen.getByText("save");

    // write the text in the input
    await user.type(input, "testing a form");

    // click the button
    await user.click(sendButton);

    console.log(createNote.mock.calls);

    // checks if the createNote is called only once mean only one note is created
    expect(createNote.mock.calls).toHaveLength(1);
    // check if the content is 'testing a form'
    expect(createNote.mock.calls[0][0].content).toBe("testing a form");
  });
});
