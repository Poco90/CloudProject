import { useState, useEffect } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: "", body: "", published: "" });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:4000/articles", { headers: { Accept: "application/json" } });
      setArticleList(response.data);
    }
    fetchData();
  }, []);

  const handleEdit = (article) => {
    setIsEditing(true);
    setEditArticle(article);
  }

  const handleSave = async (editedArticle) => {
    const response = await axios.put(`http://localhost:4000/articles/${editedArticle.id}`, editedArticle);
    setArticleList(articleList.map(article => {
      if (article.id === editedArticle.id) {
        return response.data;
      } else {
        return article;
      }
    }));
    setEditArticle(null);
    setIsEditing(false);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditArticle(null);
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/articles/${id}`);
    setArticleList(articleList.filter(article => article.id !== id));
  }

  const handleNewArticleChange = (e) => {
    setNewArticle({...newArticle, [e.target.name]: e.target.value});
  }

  const handleNewArticleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:4000/articles`, newArticle);
    setArticleList([...articleList, response.data]);
    setNewArticle({ title: "", body: "", published: "" });
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input value={editArticle.title} onChange={e => setEditArticle({...editArticle, title: e.target.value})} />
          <input value={editArticle.body} onChange={e => setEditArticle({...editArticle, body: e.target.value})} />
          <input value={editArticle.published} onChange={e => setEditArticle({...editArticle, published: e.target.value})} />
          <button onClick={() => handleSave(editArticle)}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          {articleList.map(article => (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
              <p>Published: {article.published}</p>
              <button onClick={() => handleEdit(article)}>Edit</button>
              <button onClick={() => handleDelete(article.id)}>Delete</button>
            </div>
          ))}
          <form onSubmit={handleNewArticleSubmit}>
            <input name="title" value={newArticle.title} onChange={handleNewArticleChange} />
            <input name="body" value={newArticle.body} onChange={handleNewArticleChange} />
            <input name="published" value={newArticle.published} onChange={handleNewArticleChange} />
            <button type="submit">Add Article</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
