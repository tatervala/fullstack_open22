import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div className="container">
    <form onSubmit={addBlog}>
      <Form.Group>
      <Form.Label>Title</Form.Label><input value={newTitle} onChange={handleTitleChange} />
      <div>
      <Form.Label>Author</Form.Label><input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
      <Form.Label>Url</Form.Label><input value={newUrl} onChange={handleUrlChange} />
      </div>
      </Form.Group>
      <div>
      <Button variant="primary" type="submit">
            add
      </Button>
      </div>
    </form>
    </div>
  );
};

export default BlogForm;
