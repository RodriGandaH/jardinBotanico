import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePlant from './CreatePlant';
import EditPlant from './EditPlant';
import DeletePlant from './DeletePlant';

function Plants() {
    const [plants, setPlants] = useState([]);

    const fetchPlants = async () => {
        const response = await axios.get(
            'https://apijardin.fly.dev/api/plants'
        );
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
            <h1>Plantas</h1>

            <CreatePlant onUpdate={handleUpdate} />
            {plants.length > 0 ? (
                plants.map((plant) => (
                    <div key={plant.id}>
                        <p>{plant.name}</p>
                        <p>{plant.scientific_name}</p>
                        <p>{plant.description}</p>
                        <p>{plant.category.name}</p>
                        <img
                            src={`https://apijardin.fly.dev/${plant.image}`}
                            alt={plant.name}
                            style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '50%',
                            }}
                        />
                        <EditPlant plant={plant} onUpdate={handleUpdate} />
                        <DeletePlant plant={plant} onUpdate={handleUpdate} />
                    </div>
                ))
            ) : (
                <p>No hay plantas registradas.</p>
            )}
        </>
    );
}

export default Plants;
