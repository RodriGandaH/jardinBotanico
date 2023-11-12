import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function EditPlant({ plant, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(plant.name);
    const [scientificName, setScientificName] = useState(plant.scientific_name);
    const [description, setDescription] = useState(plant.description);
    const [category, setCategory] = useState(plant.category_id);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        `http://localhost:8000/${plant.image}`
    );
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(
                'http://localhost:8000/api/categories/getCategories'
            );
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('scientific_name', scientificName);
        formData.append('description', description);
        formData.append('category_id', parseInt(category));
        if (image) {
            formData.append('image', image);
        }
        console.log('id de la planta:', plant.id);
        try {
            const response = await axios.post(
                `http://localhost:8000/api/plants/${plant.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Planta actualizada:', response.data);
            closeModal();
            onUpdate();
        } catch (error) {
            console.log('Error al actualizar la planta:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Editar planta</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar planta"
            >
                <h2>Editar planta</h2>
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

                    <label>
                        Nombre científico:
                        <input
                            type="text"
                            value={scientificName}
                            onChange={(e) => setScientificName(e.target.value)}
                        />
                    </label>

                    <label>
                        Descripción:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Categoría:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Imagen:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept=".jpeg,.jpg,.png,.gif,.svg"
                        />
                    </label>
                    <button type="submit">Guardar</button>
                </form>
                <button onClick={closeModal}>Cerrar</button>
                {previewImage && (
                    <img
                        src={previewImage}
                        alt="Vista previa de la imagen seleccionada"
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '50%',
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

export default EditPlant;
