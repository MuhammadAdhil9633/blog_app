import React, { useState, useRef, useEffect } from 'react';
import BlogCreate from './components/BlogCreate';
import BlogList from './components/BlogList';
import ErrorBoundary from './ErrorBoundary';
import './App.css';


const App = () => {
  const [view, setView] = useState('list'); // Track current view
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [currentBlog, setCurrentBlog] = useState(null); // Track the blog being edited

  const createButtonRef = useRef(null);
  const viewButtonRef = useRef(null);

  const handleSave = (blog) => {
    if (currentBlog) {
      // Update existing blog
      setBlogs(blogs.map((b) => (b === currentBlog ? { ...b, ...blog } : b)));
      setCurrentBlog(null);
    } else {
      // Create new blog
      setBlogs([...blogs, blog]);
    }
    setView('list');
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setView('create'); // Switch to create view to edit the blog
  };

  const handleDelete = (blogToDelete) => {
    setBlogs(blogs.filter((blog) => blog !== blogToDelete)); // Remove the blog
  };
 
  useEffect(() => {
    if (view === 'create') {
      createButtonRef.current.focus();
    } else {
      viewButtonRef.current.focus();
    }
  }, [view]);

  return (
    <ErrorBoundary>
      <div className="MainHead header">
        <h1>Blogging Platform</h1>
        <div className="headerbtn">
          <button
            ref={createButtonRef}
            className={view === 'create' ? 'active' : ''}
            onClick={() => setView('create')}
          >
            Create Blog
          </button>
          <button
            ref={viewButtonRef}
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
          >
            View Blogs
          </button>
        </div>
        
      </div>

      {view === 'list' && (
        <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {view === 'create' && (
        <BlogCreate onSave={handleSave} blog={currentBlog} />
      )}
    </ErrorBoundary>
  );
};

export default App;
