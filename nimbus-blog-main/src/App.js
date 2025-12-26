import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Nimbus Blog</Link> |{" "}
        <Link to="/create">Create Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route
          path="/create"
          element={<CreateBlog blogs={blogs} setBlogs={setBlogs} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function Home({ blogs }) {
  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 && <p>No blogs yet</p>}

      {blogs.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{b.title}</h3>
          <p><b>Author:</b> {b.author}</p>
          <p>{b.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

function CreateBlog({ blogs, setBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const submitBlog = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { id: Date.now(), title, content, author }]);
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <form onSubmit={submitBlog} style={{ padding: 10 }}>
      <h2>Create Blog</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      /><br /><br />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      /><br /><br />

      <button type="submit">Add Blog</button>
    </form>
  );
}

export default App;
