import React, { useState } from 'react';
import './BlogList.css';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(Array(blogs.length).fill(false)); // Track Read More/Less

  const toggleReadMore = (index) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div className='bloglist container'>
      <h1 className='head-list'>Blog List</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <h2>{blog.title}</h2>
            <p>
              {expanded[index]
                ? blog.content
                : blog.content.slice(0, 100) + (blog.content.length > 100 ? '...' : '')}
            </p>
            {blog.content.length > 100 && (
              <button onClick={() => toggleReadMore(index)}>
                {expanded[index] ? 'Read Less' : 'Read More'}
              </button>
            )}
            <div className="blog-actions">
              <button onClick={() => onEdit(blog)}>Edit</button>
              <button className='dltbtn' onClick={() => onDelete(blog)}>Delete</button> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
