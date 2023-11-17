import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function EditCategory({ category, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(category.name);

    useEffect(() => {
        setName(category.name);
    }, [category]);

    const handleEdit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/categories/${category.id}`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Categoria editada:', response.data);
            setName('');
            setModalIsOpen(false);
            onUpdate();
        } catch (error) {
            console.log('Error al editar la categoría:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>
                Editar categoría
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Editar categoría"
            >
                <h2>Editar categoría</h2>
                <form onSubmit={handleEdit}>
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
                <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            </Modal>
        </div>
    );
}

export default EditCategory;
