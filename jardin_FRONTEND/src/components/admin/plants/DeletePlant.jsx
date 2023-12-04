import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function DeletePlant({ plant, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/api/plants/${plant.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Planta eliminada');
            setModalIsOpen(false);
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar la planta:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setModalIsOpen(true)}
                className="btn btn-danger mx-1"
            >
                Eliminar
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Eliminar planta"
            >
                <p>¿Estás seguro de que quieres eliminar esta planta?</p>
                <button onClick={handleDelete}>Sí, eliminar</button>
                <button onClick={() => setModalIsOpen(false)}>
                    No, cancelar
                </button>
            </Modal>
        </div>
    );
}

export default DeletePlant;
