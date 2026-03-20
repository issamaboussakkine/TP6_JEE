import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonneList from './components/PersonneList';
import AjouterPersonne from './components/AjouterPersonne';
import ModifierPersonne from './components/ModifierPersonne';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PersonneList />} />
          <Route path="/ajouter" element={<AjouterPersonne />} />
          <Route path="/modifier/:id" element={<ModifierPersonne />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
