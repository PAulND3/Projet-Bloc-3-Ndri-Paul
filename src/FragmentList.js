import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import FragmentModal from './FragmentModal';

function FragmentList() {
  const navigate = useNavigate();
  const [fragments, setFragments] = useState([]);
  const [selectedFragment, setSelectedFragment] = useState(null);

  useEffect(() => {
    const storedFragments = JSON.parse(localStorage.getItem('fragments')) || [];
    setFragments(storedFragments);
  }, []);

  const handleEdit = (fragment) => {
    navigate('/form', { state: { fragment } });
  };

  const handleView = (fragment) => {
    setSelectedFragment(fragment);
  };

  const handleCloseModal = () => {
    setSelectedFragment(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const newFragment = { title: file.name, content };
        const updatedFragments = [...fragments, newFragment];
        setFragments(updatedFragments);
        localStorage.setItem('fragments', JSON.stringify(updatedFragments));
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="drop-zone">
      <button onClick={() => navigate('/form')} className="new-button">New</button>
      {fragments.length === 0 ? (
        <div className="empty-state">
          <img src="https://img.lovepik.com/png/20231111/filing-clipart-cartoon-tupperware-file-box-filled-with-documents-on_556003_wh860.png" alt="No fragments" />
          <p>No fragments available. Drag a text file here to get started.</p>
        </div>
      ) : (
        fragments.map((fragment, index) => (
          <div key={index} className="fragment-item">
            <span onClick={() => handleEdit(fragment)}>{fragment.title}</span>
            <button onClick={() => handleView(fragment)}>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        ))
      )}
      {selectedFragment && (
        <FragmentModal fragment={selectedFragment} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default FragmentList;