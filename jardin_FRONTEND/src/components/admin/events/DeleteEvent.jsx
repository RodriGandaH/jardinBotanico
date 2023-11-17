import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function DeleteEvent({ event, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/api/events/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Evento eliminado');
            setModalIsOpen(false);
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar el evento:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>
                Eliminar evento
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Eliminar evento"
            >
                <p>¿Estás seguro de que quieres eliminar este evento?</p>
                <button onClick={handleDelete}>Sí, eliminar</button>
                <button onClick={() => setModalIsOpen(false)}>
                    No, cancelar
                </button>
            </Modal>
        </div>
    );
}

export default DeleteEvent;
