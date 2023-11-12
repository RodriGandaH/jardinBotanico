import { useState, useEffect } from 'react';

function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    return { loading, user };
}

export default useAuth;
