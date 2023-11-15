import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://apijardin.fly.dev/api/login',
                {
                    username,
                    password,
                }
            );

            localStorage.setItem('token', response.data.token);

            window.location.href = '/admin/category';
        } catch (error) {
            if (error.response) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('Error:', error.message);
            }
        }
    };

    return (
        <div id="login">
            <h1>Iniciar Sesión</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Usuario
                        <input
                            className="form-control"
                            type="text"
                            placeholder="administrador"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Contraseña
                        <input
                            className="form-control"
                            type="password"
                            placeholder="*********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button className="btn btn-primary" type="submit">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default Login;
