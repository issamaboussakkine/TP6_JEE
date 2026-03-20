import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:9091/api/personnes';
function AjouterPersonne() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email) {
        setMessage({ text: 'Veuillez remplir tous les champs', type: 'error' });
        return;
      }

      setIsSubmitting(true);
      await axios.post(API_URL, { name, email });
      setMessage({ text: 'Personne ajoutée avec succès ! Redirection...', type: 'success' });

      setTimeout(() => navigate('/'), 1500);

    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      setMessage({ text: 'Erreur lors de l\'ajout. Le serveur est-il démarré ?', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card">
      <h2 className="title" style={{ fontSize: '2rem' }}>Ajouter une Personne</h2>

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
            autoComplete="name"
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
            autoComplete="email"
          />
        </div>

        <div className="btn-group" style={{ justifyContent: 'space-between', marginTop: '30px' }}>
          <Link to="/" className="btn btn-secondary" style={{ minWidth: '120px', textAlign: 'center' }}>
            Retour
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: '150px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AjouterPersonne;
