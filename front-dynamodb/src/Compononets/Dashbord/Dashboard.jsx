import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import RoutesConfig from '../../Routes/RoutesConfig';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            {/* Barre latérale gauche */}
            <aside className="dashboard-sidebar">
                <h2>Actions</h2>
                <button onClick={() => handleNavigation('/add-employee')}>Ajouter un employé</button>
                <button onClick={() => handleNavigation('/add-department')}>Ajouter un département</button>
                <button onClick={() => handleNavigation('/list-employees')}>Afficher les employés</button>
                <button onClick={() => handleNavigation('/apartment')}>Afficher les départements</button>
            </aside>
            
            {/* Contenu principal */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Tableau de Bord</h1>
                </header>
                
                <div >
                   <RoutesConfig/>
                </div>
                
                <footer className="dashboard-footer">
                    <p>© 2024 Mon Application. Tous droits réservés.</p>
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;
