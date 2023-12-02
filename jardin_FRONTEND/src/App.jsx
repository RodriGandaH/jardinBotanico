import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from './components/admin/Login';
import Home from './components/Home';
import useAuth from './components/admin/hooks/useAuth';
import Dashboard from './components/admin/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Galeria from './components/galeria/Galeria';
import Planta from './components/planta/Planta'
import '../src/components/galeria/Galeria.css';

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar isAdmin={auth.user} />
            <main className='flex-shrink-0 container'
                style={{ paddingTop: '8vh', paddingBottom: '2vh', minHeight: '91vh' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/galeria" element={<Galeria />} />
                        <Route path="/planta/:id" element={<Planta />} />
                        <Route path="/eventos" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin/*"
                            element={
                                auth.user ? <Dashboard /> : <Navigate to="/login" />
                            }
                        />
                    </Routes>
                </Router>
            </main>
            <Footer />
        </>
    );
}

export default App;
