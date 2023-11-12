import { useState, useEffect } from 'react';

function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setUser(true);
        }
        setLoading(false);
    }, []);

    return { loading, user };
}

export default useAuth;
