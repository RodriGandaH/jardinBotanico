import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import Category from './category/Category';
import Events from './events/Events';
import Plants from './plants/Plants';

function Dashboard() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between mx-5">
                <h1 className="navbar-brand">Dashboard</h1>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item mx-5">
                            <Link className="nav-link" to="category">
                                Categoría
                            </Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link" to="events">
                                Eventos
                            </Link>
                        </li>
                        <li className="nav-item mx-5">
                            <Link className="nav-link" to="plants">
                                Plantas
                            </Link>
                        </li>
                        <LogoutButton />
                    </ul>
                </div>
            </nav>
            <Routes>
                <Route path="category" element={<Category />} />
                <Route path="events" element={<Events />} />
                <Route path="plants" element={<Plants />} />
            </Routes>
        </div>
    );
}

export default Dashboard;
