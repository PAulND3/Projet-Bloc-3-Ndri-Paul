import React, { useEffect, useState } from 'react'; // Importation des hooks useEffect et useState de React
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate de react-router-dom pour la navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importation du composant FontAwesomeIcon pour les icônes
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Importation de l'icône faEye de FontAwesome
import FragmentModal from './FragmentModal'; // Importation du composant FragmentModal

function FragmentList() {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const [fragments, setFragments] = useState([]); // État pour stocker les fragments
  const [selectedFragment, setSelectedFragment] = useState(null); // État pour le fragment sélectionné

  useEffect(() => {
    const storedFragments = JSON.parse(localStorage.getItem('fragments')) || []; // Récupère les fragments stockés dans le localStorage ou initialise un tableau vide
    setFragments(storedFragments); // Met à jour l'état des fragments avec les fragments stockés
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute uniquement au montage du composant

  const handleEdit = (fragment) => {
    navigate('/form', { state: { fragment } }); // Navigue vers la page du formulaire avec l'état du fragment à éditer
  };

  const handleView = (fragment) => {
    setSelectedFragment(fragment); // Met à jour l'état du fragment sélectionné pour l'afficher dans le modal
  };

  const handleCloseModal = () => {
    setSelectedFragment(null); // Réinitialise l'état du fragment sélectionné pour fermer le modal
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut de l'événement de dépôt
    const file = event.dataTransfer.files[0]; // Récupère le premier fichier déposé
    if (file && file.type === 'text/plain') { // Vérifie si le fichier est un fichier texte
      const reader = new FileReader(); // Crée un nouveau FileReader pour lire le fichier
      reader.onload = (e) => {
        const content = e.target.result; // Récupère le contenu du fichier lu
        const newFragment = { title: file.name, content }; // Crée un nouvel objet fragment avec le titre du fichier et son contenu
        const updatedFragments = [...fragments, newFragment]; // Ajoute le nouveau fragment à la liste des fragments existants
        setFragments(updatedFragments); // Met à jour l'état des fragments avec la nouvelle liste
        localStorage.setItem('fragments', JSON.stringify(updatedFragments)); // Stocke la nouvelle liste des fragments dans le localStorage
      };
      reader.readAsText(file); // Lit le fichier comme du texte
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut de l'événement de survol
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="drop-zone"> {/* Zone de dépôt pour les fichiers */}
      <button onClick={() => navigate('/form')} className="new-button">New</button> {/* Bouton pour créer un nouveau fragment */}
      {fragments.length === 0 ? ( // Si la liste des fragments est vide
        <div className="empty-state">
          <img src="https://img.lovepik.com/png/20231111/filing-clipart-cartoon-tupperware-file-box-filled-with-documents-on_556003_wh860.png" alt="No fragments" /> {/* Image affichée lorsqu'il n'y a aucun fragment */}
          <p>No fragments available. Drag a text file here to get started.</p> {/* Message affiché lorsqu'il n'y a aucun fragment */}
        </div>
      ) : ( // Si la liste des fragments n'est pas vide
        fragments.map((fragment, index) => (
          <div key={index} className="fragment-item"> {/* Affiche chaque fragment dans une div */}
            <span onClick={() => handleEdit(fragment)}>{fragment.title}</span> {/* Titre du fragment cliquable pour éditer */}
            <button onClick={() => handleView(fragment)}> {/* Bouton pour afficher le fragment */}
              <FontAwesomeIcon icon={faEye} /> {/* Icône de l'œil pour le bouton d'affichage */}
            </button>
          </div>
        ))
      )}
      {selectedFragment && ( // Si un fragment est sélectionné
        <FragmentModal fragment={selectedFragment} onClose={handleCloseModal} /> // Affiche le modal pour le fragment sélectionné
      )}
    </div>
  );
}

export default FragmentList; // Exporte le composant FragmentList
