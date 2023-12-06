import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateInfo from './CreateInfo';
import EditInfo from './EditInfo';
import DeleteInfo from './DeleteInfo';

function Info() {
    const [info, setInfo] = useState([]);

    const fetchInfo = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/networks');
        setInfo(response.data);
        console.log(response.data);
    };
    useEffect(() => {
        fetchInfo();
    }, []);
    const handleUpdate = () => {
        fetchInfo();
    };
    return (
        <>
            <h1 className="mb-4">Informacion</h1>

            <CreateInfo onUpdate={handleUpdate} />
            {info.length > 0 ? (
                info.map((inf) => (
                    <div className="card mb-3" key={inf.id}>
                        <div className="card-body">
                            <p>
                                <strong>{inf.name}:</strong> {inf.data}{' '}
                            </p>
                        </div>
                        <div className="m-2 d-flex justify-content-end">
                            <EditInfo inf={inf} onUpdate={handleUpdate} />
                            <DeleteInfo inf={inf} onUpdate={handleUpdate} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay eventos registrados.</p>
            )}
        </>
    );
}

export default Info;
