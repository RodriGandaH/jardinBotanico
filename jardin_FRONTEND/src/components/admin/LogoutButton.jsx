import axios from 'axios';

const LogoutButton = (props) => {
    const logout = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/logout',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                localStorage.removeItem('token');
                window.location.href = '/';
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };

    return (
        <button
            className="btn btn-outline-danger"
            onClick={logout}
            hidden={!props.isAdmin}
        >
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
