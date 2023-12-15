import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePlant from './CreatePlant';
import EditPlant from './EditPlant';
import DeletePlant from './DeletePlant';

let plantsCopy;
function Plants() {
    const [plants, setPlants] = useState([]);

    const fetchPlants = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/plants');
        plantsCopy = [...response.data];
        setPlants(response.data);
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const buscarPlanta = (plantaBuscada, e) => {
        let plantasFiltradas = [];
        let origenFiltrado =
            e.key === 'Backspace' ? [...plantsCopy] : [...plants];
        plantasFiltradas = origenFiltrado.filter((planta) => {
            let nombre = planta.name.toLowerCase();
            plantaBuscada = plantaBuscada.toLowerCase();
            return nombre.includes(plantaBuscada);
        });
        setPlants(plantasFiltradas);
    };

    return (
        <>
            <h1 className="mb-4" style={{color: "#091f14"}}>Plantas</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <CreatePlant onUpdate={fetchPlants} plants={plants} />
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span
                            className="input-group-text bi bi-search"
                            id="inconoBuscador"
                        ></span>
                        <input
                            id="buscadorPlantas"
                            type="text"
                            className="form-control"
                            placeholder="Buscar planta..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador"
                            onKeyUp={(e) => buscarPlanta(e.target.value, e)}
                        />
                    </div>
                </div>
            </div>
            {plants.length > 0 ? (
                plants.map((plant) => (
                    <div key={plant.id} className="card mb-3">
                        <div className="card-body pb-0">
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

                        </div>
                        <div className="ms-3 me-2 d-flex justify-content-between">
                            <div className="mb-2">
                                <strong>Categoría:</strong>{' '}
                                {plant.category
                                    ? plant.category.name
                                    : 'Sin categoría'}
                            </div>
                            <div className='d-flex mb-2'>
                                <EditPlant
                                    plant={plant}
                                    onUpdate={fetchPlants}
                                    id={plant.id}
                                    plants={plants}
                                />
                                <DeletePlant plant={plant} onUpdate={fetchPlants} />
                            </div>

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
