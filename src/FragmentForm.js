import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FragmentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const fragment = location.state?.fragment || { title: '', content: '' };
  const [title, setTitle] = useState(fragment.title);
  const [content, setContent] = useState(fragment.content);

  useEffect(() => {
    if (location.state?.fragment) {
      setTitle(location.state.fragment.title);
      setContent(location.state.fragment.content);
    }
  }, [location.state]);

  const handleSave = () => {
    const newFragment = { title, content };
    const existingFragments = JSON.parse(localStorage.getItem('fragments')) || [];
    if (location.state?.fragment) {
      // Update existing fragment
      const updatedFragments = existingFragments.map(frag =>
        frag.title === fragment.title && frag.content === fragment.content ? newFragment : frag
      );
      localStorage.setItem('fragments', JSON.stringify(updatedFragments));
    } else {
      // Add new fragment
      existingFragments.push(newFragment);
      localStorage.setItem('fragments', JSON.stringify(existingFragments));
    }
    navigate('/');
  };

  const handleDelete = () => {
    if (location.state?.fragment) {
      const existingFragments = JSON.parse(localStorage.getItem('fragments')) || [];
      const updatedFragments = existingFragments.filter(frag =>
        frag.title !== fragment.title || frag.content !== fragment.content
      );
      localStorage.setItem('fragments', JSON.stringify(updatedFragments));
    }
    navigate('/');
  };

  return (
    <div>
      <main>
        <div className="form-container">
          <h2>Complete the form</h2>
          <form>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="form-buttons">
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </main>
    </div>
  );
}

export default FragmentForm;