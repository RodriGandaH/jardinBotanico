import React, { useState, useEffect } from 'react';

import axios from 'axios';

function CreatePlant({ onUpdate }) {
    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
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

    useEffect(() => {
        $('#createPlantModal').on('hidden.bs.modal', function () {
            setName('');
            setScientificName('');
            setDescription('');
            setCategory('');
            setImages([]);
            setPreviewImages([]);
        });
    }, []);

    const handleImageChange = (e) => {
        setImages([...images, ...e.target.files]);
        setPreviewImages([
            ...previewImages,
            ...Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            ),
        ]);
    };
    const removeImage = (index) => (event) => {
        event.preventDefault();
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('scientific_name', scientificName);
        formData.append('description', description);
        formData.append('category_id', parseInt(category));
        images.forEach((image, i) => {
            formData.append(`images[${i}]`, image);
        });

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

            $('#createPlantModal').modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al crear la planta:', error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createPlantModal"
            >
                Crear planta
            </button>

            <div
                className="modal fade"
                id="createPlantModal"
                tabIndex="-1"
                aria-labelledby="createPlantModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="motal-title"
                                id="createPlantModalLabel"
                            >
                                Crear Planta
                            </h5>
                            <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col">
                                        <label
                                            htmlFor="plantName"
                                            className="form-label"
                                        >
                                            Nombre:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="plantName"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label
                                            htmlFor="scientificName"
                                            className="form-label"
                                        >
                                            Nombre cientifico:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="scientificName"
                                            value={scientificName}
                                            onChange={(e) =>
                                                setScientificName(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 col-4">
                                    <label
                                        htmlFor="category"
                                        className="form-label"
                                    >
                                        Categoría:
                                    </label>
                                    <select
                                        className="form-select"
                                        id="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Selecciona una categoría
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="plantDescription"
                                        className="form-label"
                                    >
                                        Descripcion
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="plantDescription"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor="plantImages"
                                        className="form-label"
                                    >
                                        Imagenes:
                                    </label>
                                    <div className="d-flex flex-wrap justify-content-around">
                                        <div
                                            className="card m-2"
                                            style={{
                                                width: '250px',
                                                height: '250px',
                                            }}
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        'plantImages'
                                                    )
                                                    .click()
                                            }
                                        >
                                            <div className="card-body d-flex flex-column justify-content-center align-items-center card-color">
                                                <i className="bi bi-plus-lg fs-4"></i>
                                                <p className="card-text fs-4">
                                                    Agregar
                                                </p>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="plantImages"
                                                    onChange={handleImageChange}
                                                    accept=".jpeg,.jpg,.png,.gif,.svg"
                                                    multiple
                                                    required
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                        {previewImages.map((url, i) => (
                                            <div
                                                key={i}
                                                className="position-relative m-2"
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Vista previa de la imagen seleccionada ${
                                                        i + 1
                                                    }`}
                                                    className="img-thumbnail"
                                                    style={{
                                                        width: '250px',
                                                        height: '250px',
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-danger position-absolute top-0 end-0"
                                                    onClick={(event) =>
                                                        removeImage(i)(event)
                                                    }
                                                >
                                                    <i className="bi bi-trash-fill"></i>{' '}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePlant;
