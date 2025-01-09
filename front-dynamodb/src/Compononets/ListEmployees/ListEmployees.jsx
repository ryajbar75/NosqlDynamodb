// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
  // Import du formulaire
import './ListEmployees.css';  // Import du CSS spécifique au composant
import AddEmployeeWithCapture from "../AddEmployee/AddEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8083/api/employees/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des employés");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8083/departments")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Erreur lors de la récupération des départements:", error));
  }, []);

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setShowForm(false);  // Cacher le formulaire après l'ajout
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dep => dep.departmentId === departmentId);
    return department ? department.departmentName : "Département inconnu";
  };

  if (loading) {
    return <p>Chargement des employés...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="employee-list">
      <h2>Liste des employés</h2>
      <div>
        {employees.length === 0 ? (
          <p>Aucun employé trouvé</p>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.employeeId}
              className="employee-item"
            >
              <div className="employee-photo">
                {employee.photoUrl ? (
                  <img
                    src={employee.photoUrl}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="employee-photo-img"
                  />
                ) : (
                  <div className="employee-photo-placeholder"></div>
                )}
              </div>
              <div className="employee-details">
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p>Email: {employee.email}</p>
                <p><strong>Département:</strong> {getDepartmentName(employee.departmentId)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && <AddEmployeeWithCapture onAddEmployee={handleAddEmployee} />}

      <button className="toggle-form-button" onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Annuler" : "Ajouter un employé"}
      </button>
    </div>
  );
};

export default EmployeeList;
