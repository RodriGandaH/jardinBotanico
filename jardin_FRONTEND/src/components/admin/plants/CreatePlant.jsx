import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function CreatePlant({ onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/categories/getCategories'
            );
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setName('');
        setScientificName('');
        setDescription('');
        setCategory('');
        setImage(null);
        setPreviewImage(null);
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
            console.log('image', image);
            formData.append('image', image);
        }
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log('Contenido de formData:', formData);
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/plants',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Planta creada:', response.data);
            setName('');
            setDescription('');
            setCategory('');
            setImage(null);
            setPreviewImage(null);
            closeModal();
            onUpdate();
        } catch (error) {
            console.log('Error al crear la planta:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Crear planta</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crear planta"
            >
                <h2>Crear planta</h2>
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
                            required
                        />
                    </label>
                    <button type="submit">Guardar</button>
                    <button onClick={closeModal}>Cerrar</button>
                </form>
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

export default CreatePlant;
