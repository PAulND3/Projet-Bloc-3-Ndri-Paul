import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React
import { useNavigate, useLocation } from 'react-router-dom'; // Importation des hooks useNavigate et useLocation de react-router-dom

function FragmentForm() {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const location = useLocation(); // Hook pour obtenir l'état actuel de la localisation
  const fragment = location.state?.fragment || { title: '', content: '' }; // Récupère le fragment de l'état de la localisation ou initialise un fragment vide
  const [title, setTitle] = useState(fragment.title); // État pour le titre du fragment
  const [content, setContent] = useState(fragment.content); // État pour le contenu du fragment
  const [errors, setErrors] = useState({}); // État pour les messages d'erreur de validation

  useEffect(() => {
    if (location.state?.fragment) {
      setTitle(location.state.fragment.title); // Met à jour le titre si un fragment est passé dans l'état de la localisation
      setContent(location.state.fragment.content); // Met à jour le contenu si un fragment est passé dans l'état de la localisation
    }
  }, [location.state]); // Exécute cet effet lorsque l'état de la localisation change

  const validate = () => {
    const newErrors = {}; // Initialise un objet pour les erreurs de validation
    if (!title) newErrors.title = 'Title is required'; // Ajoute une erreur si le titre est vide
    if (!content) newErrors.content = 'Content is required'; // Ajoute une erreur si le contenu est vide
    return newErrors; // Retourne les erreurs de validation
  };

  const handleSave = () => {
    const validationErrors = validate(); // Valide les champs du formulaire
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Met à jour l'état des erreurs si des erreurs sont trouvées
      return; // Arrête l'exécution de la fonction si des erreurs sont présentes
    }

    const newFragment = { title, content }; // Crée un nouvel objet fragment avec le titre et le contenu
    const existingFragments = JSON.parse(localStorage.getItem('fragments')) ; // Récupère les fragments existants du localStorage ou initialise un tableau vide
    if (location.state?.fragment) {
      // Met à jour le fragment existant
      const updatedFragments = existingFragments.map(frag =>
        frag.title === fragment.title && frag.content === fragment.content ? newFragment : frag
      );
      localStorage.setItem('fragments', JSON.stringify(updatedFragments)); // Met à jour les fragments dans le localStorage
    } else {
      // Ajoute un nouveau fragment
      existingFragments.push(newFragment);
      localStorage.setItem('fragments', JSON.stringify(existingFragments)); // Sauvegarde les fragments dans le localStorage
    }
    navigate('/'); // Redirige vers la page d'accueil
  };

  const handleDelete = () => {
    if (location.state?.fragment) {
      const existingFragments = JSON.parse(localStorage.getItem('fragments')) ; // Récupère les fragments existants du localStorage ou initialise un tableau vide
      const updatedFragments = existingFragments.filter(frag =>
        frag.title !== fragment.title || frag.content !== fragment.content
      );
      localStorage.setItem('fragments', JSON.stringify(updatedFragments)); // Met à jour les fragments dans le localStorage après suppression
    }
    navigate('/'); // Redirige vers la page d'accueil
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
                onChange={(e) => setTitle(e.target.value)} // Met à jour l'état du titre lorsque l'utilisateur tape
                className={errors.title ? 'error' : ''} // Ajoute une classe d'erreur si le titre est invalide
              />
              {errors.title && <p className="error-message">{errors.title}</p>} 
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)} // Met à jour l'état du contenu lorsque l'utilisateur tape
                className={errors.content ? 'error' : ''} // Ajoute une classe d'erreur si le contenu est invalide
              />
              {errors.content && <p className="error-message">{errors.content}</p>} 
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

export default FragmentForm; // Exporte le composant FragmentForm