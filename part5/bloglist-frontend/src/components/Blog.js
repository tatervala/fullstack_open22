import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const Blog = (props) => {
  const blog = props.blog;
  const [blogObject, setBlogObject] = useState(blog);
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    props.updateBlog(updatedBlog);
    setBlogObject(updatedBlog);
  };

  const delBlog = () => props.removeBlog(blog);

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 1,
  };

  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title} - {blog.author}{" "}
          <Button onClick={toggleVisibility}>{buttonLabel}</Button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blogObject.likes} <Button onClick={increaseLikes}>like</Button>
        </p>
        <Button variant="primary" onClick={delBlog}>remove</Button>
      </div>
    </div>
  );
};
Blog.propTypes = {};
export default Blog;
