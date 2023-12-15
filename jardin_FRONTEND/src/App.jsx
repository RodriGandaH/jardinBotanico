import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from './components/admin/Login';
import Home from './components/Home';
import useAuth from './components/admin/hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Galeria from './components/galeria/Galeria';
import Planta from './components/planta/Planta';
import Eventos from './components/eventos/Eventos';
import Category from './components/admin/category/Category';
import Plants from './components/admin/plants/Plants';
import Events from './components/admin/events/Events';
import '../src/components/galeria/Galeria.css';
import Info from './components/admin/info/Info';

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh"
        }}>
            <Navbar isAdmin={auth.user} />
            <main
                className="container"
                style={{
                    marginTop: '80px',
                    marginBottom: '20px',
                    flex: "1 0 auto"
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/galeria" element={<Galeria />} />
                        <Route path="/planta/:id" element={<Planta />} />
                        <Route path="/eventos" element={<Eventos />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin/category"
                            element={
                                auth.user ? (
                                    <Category />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/admin/events"
                            element={
                                auth.user ? (
                                    <Events />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/admin/plants"
                            element={
                                auth.user ? (
                                    <Plants />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/admin/info"
                            element={
                                auth.user ? <Info /> : <Navigate to="/info" />
                            }
                        />
                    </Routes>
                </Router>
            </main>
            <Footer />
        </div>
    );
}

export default App;
