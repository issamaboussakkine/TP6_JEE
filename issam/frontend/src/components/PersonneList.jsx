import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:9091/api/personnes';
function PersonneList() {
  const [personnes, setPersonnes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonnes();
  }, []);

  const fetchPersonnes = async () => {
    try {
      const response = await axios.get(API_URL);
      setPersonnes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des personnes:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette personne ? Cette action est irréversible.")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setPersonnes(personnes.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression. Veuillez vérifier la connexion au serveur.");
      }
    }
  };

  return (
    <div className="glass-card">
      <h1 className="title">TP6 - Gestion des Personnes</h1>

      <div className="header-actions">
        <p>Gérez facilement votre liste de contacts</p>
        <Link to="/ajouter" className="btn btn-primary">
          <i className="fas fa-plus"></i> + Ajouter une Personne
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Chargement des données...</p>
        </div>
      ) : personnes.length === 0 ? (
        <div className="message message-success" style={{ marginTop: '20px' }}>
          La liste est vide. Ajoutez une personne pour commencer.
        </div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Nom Complet</th>
                <th>Adresse Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {personnes.map(personne => (
                <tr key={personne.id}>
                  <td><strong>{personne.name}</strong></td>
                  <td>{personne.email}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/modifier/${personne.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                        Modifier
                      </Link>
                      <button onClick={() => handleDelete(personne.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PersonneList;
