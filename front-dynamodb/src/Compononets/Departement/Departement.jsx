import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Fonction pour gérer la vue des détails d'un département
const handleViewDetails = (id) => {
    console.log(`Voir les détails du département avec ID: ${id}`);
    // Rediriger vers une page de détails ou afficher une modale ici
  };

  // Fonction pour supprimer un département
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/departments/${id}`); // API pour supprimer le département
      setDepartments(departments.filter((department) => department.departmentId !== id)); // Mise à jour de la liste
      alert('Département supprimé avec succès');
    } catch (err) {
      alert('Erreur lors de la suppression du département');
    }
  };
  // Fonction pour récupérer les départements depuis l'API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8083/departments'); // URL de l'API
        setDepartments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des départements');
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Gestion du chargement et des erreurs
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Affichage des départements dans un tableau
  return (
    <div>
      <h2>Liste des départements</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Code</th>
            <th>Employés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentCode}</td>
           
              <td>
                <button onClick={() => handleViewDetails(department.departmentId)}>Voir</button>
                <button onClick={() => handleDelete(department.departmentId)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  
};

export default DepartmentList;
