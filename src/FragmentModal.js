import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function FragmentModal({ fragment, onClose }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(fragment.content);
    alert('Content copied to clipboard');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">✖</button>
        <h2>{fragment.title}</h2>
        <pre>{fragment.content}</pre>
        <button onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} /> Copy
        </button>
      </div>
    </div>
  );
}

export default FragmentModal;
