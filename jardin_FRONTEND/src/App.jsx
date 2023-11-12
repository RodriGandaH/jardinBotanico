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

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return (
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
    );
}

export default App;
