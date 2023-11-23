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

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar auth={auth} />
            <main className='flex-shrink-0 container' style={{ paddingTop: '6vh', minHeight: '91vh' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
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
