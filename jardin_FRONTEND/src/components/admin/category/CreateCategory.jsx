import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function CreateCategory({ onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setName('');
        setModalIsOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'https://apijardin.fly.dev/api/categories',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Categoría creada:', response.data);
            setName('');
            closeModal();
            onUpdate();
        } catch (error) {
            console.log('Error al crear la categoría:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Crear categoría</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crear categoría"
            >
                <h2>Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Guardar</button>
                </form>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </div>
    );
}

export default CreateCategory;
