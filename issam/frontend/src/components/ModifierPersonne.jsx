import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:9091/api/personnes';
function ModifierPersonne() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonneData = async () => {
      try {
        const response = await axios.get(API_URL);
        const personne = response.data.find(p => p.id === parseInt(id) || p.id === id);

        if (personne) {
          setName(personne.name);
          setEmail(personne.email);
        } else {
          setMessage({ text: 'Personne introuvable.', type: 'error' });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        setMessage({ text: 'Impossible de charger les données. Vérifiez la connexion au serveur.', type: 'error' });
        setIsLoading(false);
      }
    };

    fetchPersonneData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email) {
        setMessage({ text: 'Veuillez remplir tous les champs', type: 'error' });
        return;
      }

      setIsSubmitting(true);
      await axios.put(`${API_URL}/${id}`, { name, email });
      setMessage({ text: 'Modifications enregistrées avec succès !', type: 'success' });

      setTimeout(() => navigate('/'), 1500);

    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      setMessage({ text: 'Erreur lors de la modification.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Chargement des informations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="title" style={{ fontSize: '2rem' }}>Modifier la Personne</h2>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom Complet</label>
          <input
            id="name"
            type="text"
            className="glass-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Adresse Email</label>
          <input
            id="email"
            type="email"
            className="glass-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: john.doe@example.com"
          />
        </div>

        <div className="btn-group" style={{ justifyContent: 'space-between', marginTop: '30px' }}>
          <Link to="/" className="btn btn-secondary" style={{ minWidth: '120px', textAlign: 'center' }}>
            Annuler
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: '150px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Modifier'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifierPersonne;
