import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePlant from './CreatePlant';
import EditPlant from './EditPlant';
import DeletePlant from './DeletePlant';

function Plants() {
    const [plants, setPlants] = useState([]);

    const fetchPlants = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/plants');
        setPlants(response.data);
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const handleUpdate = () => {
        fetchPlants();
    };

    return (
        <>
            <h1 className="mb-4">Plantas</h1>

            <CreatePlant onUpdate={handleUpdate} />
            {plants.length > 0 ? (
                plants.map((plant) => (
                    <div key={plant.id} className="card mb-3">
                        <div className="card-body">
                            <p>
                                <strong>Nombre:</strong> {plant.name}
                            </p>
                            <p>
                                <strong>Nombre científico:</strong>{' '}
                                {plant.scientific_name}
                            </p>
                            <p>
                                <strong>Descripción:</strong>{' '}
                                {plant.description}
                            </p>
                            <p className="mb-0">
                                <strong>Categoría:</strong>{' '}
                                {plant.category.name}
                            </p>
                        </div>
                        <div className="m-2 d-flex justify-content-end">
                            <EditPlant
                                plant={plant}
                                onUpdate={handleUpdate}
                                id={plant.id}
                            />
                            <DeletePlant
                                plant={plant}
                                onUpdate={handleUpdate}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay plantas registradas.</p>
            )}
        </>
    );
}

export default Plants;
