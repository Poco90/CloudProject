import React from 'react';

function Article({ article }) {
  const handleOpen = () => {
    window.open(`/articles/${article.id}`, '_blank');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.body}</p>
        <p className="card-text">{article.published ? 'Published' : 'Not Published'}</p>
        <button className="btn btn-primary" onClick={handleOpen}>Open</button>
      </div>
    </div>
  );
}

export default Article;

