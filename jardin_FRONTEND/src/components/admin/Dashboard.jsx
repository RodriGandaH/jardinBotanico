import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import Category from './category/Category';
import Events from './events/Events';
import Plants from './plants/Plants';

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <LogoutButton />
            <ul>
                <li>
                    <Link to="category">Categoría</Link>
                </li>
                <li>
                    <Link to="events">Eventos</Link>
                </li>
                <li>
                    <Link to="plants">Plantas</Link>
                </li>
            </ul>
            <Routes>
                <Route path="category" element={<Category />} />
                <Route path="events" element={<Events />} />
                <Route path="plants" element={<Plants />} />
            </Routes>
        </>
    );
}

export default Dashboard;
