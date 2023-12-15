import React from 'react';
import axios from 'axios';

function DeletePlant({ plant, onUpdate }) {
    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/api/plants/${plant.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Planta eliminada');
            $(`#deletePlantModal-${plant.id}`).modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar la planta:', error);
        }
    };

    return (
        <div>
            <button
                data-bs-toggle="modal"
                data-bs-target={`#deletePlantModal-${plant.id}`}
                className="btn btn-outline-danger mx-1"
            >
                Eliminar
            </button>
            <div
                className="modal fade"
                id={`deletePlantModal-${plant.id}`}
                tabIndex="-1"
                aria-labelledby="deletePlantModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="deletePlantModalLabel"
                            >
                                Eliminar planta
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                ¿Estás seguro de que quieres eliminar la planta
                                "{plant.name}" ?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                No, cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePlant;
