import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const input = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("add");

  await user.type(input[0], "jep");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("jep");
});
