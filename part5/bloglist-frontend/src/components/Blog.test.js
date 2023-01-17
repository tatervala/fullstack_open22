import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component tests", () => {
  const blog = {
    title: "asd",
    author: "asdad",
    url: "net.com",
    likes: 2,
  };

  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();

  test("render content", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
    expect(component.container).toHaveTextContent("asd - asdad");
  });

  test("show url and likes when view-button is pressed", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("net.com");

    expect(component.container).toHaveTextContent("2");
  });
});
