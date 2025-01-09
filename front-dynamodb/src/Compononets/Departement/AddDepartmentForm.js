// src/components/AddDepartmentForm.js
import React, { useState } from "react";
import './AddDepartmentForm.css';  // Import du CSS spécifique au composant

const AddDepartmentForm = ({ onAddDepartment }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");  // Nouveau champ pour le code du département
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDepartment = { departmentName, departmentCode };

    fetch("http://localhost:8083/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDepartment),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddDepartment(data);  // Appel de la fonction pour ajouter le département
        setDepartmentName("");
        setDepartmentCode("");  // Réinitialisation du champ departmentCode
        
      })
      .catch((error) => console.error("Erreur lors de l'ajout du département:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-department-form">
      <h3>Ajouter un nouveau département</h3>
      <div>
        <label>Nom du département:</label>
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Code du département:</label>
        <input
          type="text"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
          required
        />
      </div>
    
      <button type="submit">Ajouter le département</button>
    </form>
  );
};

export default AddDepartmentForm;
