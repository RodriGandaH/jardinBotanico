import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function DeleteCategory({ category, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(
                `https://apijardin.fly.dev/api/categories/${category.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Categoria eliminada:', response.data);
            setModalIsOpen(false);
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar la categoría:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>
                Eliminar categoría
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Eliminar categoría"
            >
                <p>¿Estás seguro de que quieres eliminar esta categoría?</p>
                <button onClick={handleDelete}>Sí, eliminar</button>
                <button onClick={() => setModalIsOpen(false)}>
                    No, cancelar
                </button>
            </Modal>
        </div>
    );
}

export default DeleteCategory;
