import React, { useState, useEffect } from 'react';
import './BlogCreate.css';

const BlogCreate = ({ onSave, blog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]); // Populate form fields when editing

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!content) errors.content = 'Content is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    onSave({ title, content });
    setTitle('');
    setContent('');
    setErrors({});
  };

  return (
    <div className="content">
      <div className="create-cont container">
        <h1>{blog ? 'Edit Blog Post' : 'Create a New Blog Post'}</h1>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-input">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="con-tent">
            <label>Content:</label>
            <textarea
              className="text-create"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">{blog ? 'Update Blog' : 'Create Blog'}</button>
        </form>
      </div>
    </div>
  );
};

export default BlogCreate;
