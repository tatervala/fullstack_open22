import { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Blog from "./components/Blog";
import Users from "./components/Users"
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { Table, Form, Button } from 'react-bootstrap'
import {initializeBlog, addBlog, deleteBlog, voteBlog} from "./reducers/blogReducer";
import store from "./store";
const App = () => {
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlog(blogs));
    })}, []);
    const blogs = useSelector((state) => state.blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      const notification = {
        type: "success",
        text: "Logged in"
      }
      store.dispatch(notification)
      setTimeout(() => {
        store.dispatch({ type: 'timeout', text: '' })
      }, 5000);
    
  };
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();

    const notification = {
      type: "success",
      text: "Logged out"
    }
    store.dispatch(notification)
    setTimeout(() => {
      store.dispatch({ type: 'timeout', text: '' })
    }, 5000);
    window.location.reload();
  };
  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility();
      const notification = {
        type: 'success',
        text: `${BlogToAdd.title} by ${BlogToAdd.author} added`
      }
      store.dispatch(notification)
      dispatch(addBlog(BlogToAdd));
      setTimeout(() => {
        store.dispatch({ type: 'timeout', text: '' })
      }, 5000);
    } catch (exception) {
      const notification = {
        type: "error",
        text: `Cannot add blog ${BlogToAdd.title}`
      }
      store.dispatch(notification)
      setTimeout(() => {
        store.dispatch({ type: 'timeout', text: '' })
      }, 5000);
    }
  };
  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate);
      const notification = {
        type: "success",
        text: `Blog ${BlogToUpdate.title} was successfully updated`
      }
      store.dispatch(notification)
      dispatch(voteBlog(BlogToUpdate))
      setTimeout(() => {
        store.dispatch({ type: 'timeout', text: '' })
      }, 5000);
    } catch (exception) {
      const notification = {
        type: "error",
        text: `Cannot update blog ${BlogToUpdate.title}`
      }
      store.dispatch(notification)
      setTimeout(() => {
        store.dispatch({ type: 'timeout', text: '' })
      }, 5000);
    }
  };
  const removeBlog = async (BlogToRemove) => {
    
    dispatch(deleteBlog(BlogToRemove))
    const notification = {
      type: "success",
      text: `Blog ${BlogToRemove.title} was successfully deleted`
    }
    store.dispatch(notification)
    setTimeout(() => {
      store.dispatch({ type: 'timeout', text: '' })
    }, 5000);

  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          
          </Form.Group>
          <div>
            <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            </Form.Group>
          </div> 
          <Button variant="primary" type="submit">
            login
          </Button>
        </form>
      </div>
    );
  }
  return (
    <div className="container">
      <h2>blogs</h2>
      <Notification/>
      <h3>
        {user.name} logged in <Button onClick={handleLogout}>log out</Button>
      </h3>
      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Users/>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
