import React, { useEffect, useState } from "react";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Appeler l'API pour récupérer tous les employés
        fetch("http://localhost:8083/api/employees/all")
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    return (
        <div>
            <h2>Liste des employés</h2>
            <div>
                {employees.length === 0 ? (
                    <p>Aucun employé trouvé</p>
                ) : (
                    employees.map(employee => (
                        <div key={employee.employeeId}>
                            <h3>{employee.firstName} {employee.lastName}</h3>
                            <p>Email: {employee.email}</p>
                            <p>Department: {employee.department}</p>
                            <img
                                src={employee.photoUrl}
                                alt={`${employee.firstName} ${employee.lastName}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
