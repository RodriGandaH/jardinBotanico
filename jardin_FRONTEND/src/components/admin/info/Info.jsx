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
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleUpdate = () => {
        fetchInfo();
    };

    return (
        <>
            <h1 className="mb-4" style={{color: "#091f14"}}>Información</h1>

            <CreateInfo onUpdate={handleUpdate} info={info}/>
            {info.length > 0 ? (
                info.map((inf) => (
                    <div className="d-flex justify-content-between mb-3 border rounded" key={inf.id}>
                        <p className='mt-2 ms-2'>
                            <strong>{inf.name}:</strong> {inf.data}{' '}
                        </p>
                        <div className="me-2 mt-2 d-flex justify-content-end">
                            <div className='me-2'>
                                <EditInfo inf={inf} onUpdate={handleUpdate} />
                            </div>
                            <DeleteInfo inf={inf} onUpdate={handleUpdate} />
                        </div>

                    </div>
                ))
            ) : (
                <p>No hay información registrada.</p>
            )}
        </>
    );
}

export default Info;
