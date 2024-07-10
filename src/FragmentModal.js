import React from 'react'; // Importation de React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importation du composant FontAwesomeIcon pour les icônes
import { faCopy } from '@fortawesome/free-solid-svg-icons'; // Importation de l'icône faCopy de FontAwesome

// Définition du composant FragmentModal
function FragmentModal({ fragment, onClose }) {
  // Fonction pour copier le contenu du fragment dans le presse-papiers
  const handleCopy = () => {
    navigator.clipboard.writeText(fragment.content); // Copie le contenu du fragment dans le presse-papiers
    alert('Content copied to clipboard'); // Affiche une alerte pour indiquer que le contenu a été copié
  };

  // Rendu du composant
  return (
    <div className="modal"> {/* Conteneur principal de la modale */}
      <div className="modal-content"> {/* Conteneur du contenu de la modale */}
        <button onClick={onClose} className="modal-close">✖</button> {/* Bouton pour fermer la modale */}
        <h2>{fragment.title}</h2> {/* Titre du fragment */}
        <pre>{fragment.content}</pre> {/* Contenu du fragment */}
        <button onClick={handleCopy}> {/* Bouton pour copier le contenu du fragment */}
          <FontAwesomeIcon icon={faCopy} /> Copy {/* Icône de copie et texte du bouton */}
        </button>
      </div>
    </div>
  );
}

export default FragmentModal; // Exporte le composant FragmentModal