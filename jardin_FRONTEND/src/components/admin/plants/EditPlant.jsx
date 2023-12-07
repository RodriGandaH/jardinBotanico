import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditPlant({ plant, onUpdate }) {
    const [name, setName] = useState(plant.name);
    const [scientificName, setScientificName] = useState(plant.scientific_name);
    const [description, setDescription] = useState(plant.description);
    const [category, setCategory] = useState(
        plant.category ? plant.category.id : ''
    );

    const [oldImages, setOldImages] = useState(plant.images || []);
    const [previewImages, setPreviewImages] = useState(
        oldImages.map((image) => {
            const url = `http://127.0.0.1:8000/${image.image}`;
            return url;
        })
    );
    const [newImages, setNewImages] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [deletedPropertyIds, setDeletedPropertyIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [medicinalProperties, setMedicinalProperties] = useState(
        plant.medicinal_properties.map((property) => ({
            ...property,
            description: property.description || '',
        })) || []
    );

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
        $(`#editPlantModal-${plant.id}`).on(
            'hidden.bs.modal',
            async function () {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/plants/${plant.id}`
                );

                const updatedPlant = response.data;
                setName(plant.name);
                setScientificName(plant.scientific_name);
                setDescription(plant.description);
                setCategory(plant.category ? plant.category.id : '');
                setOldImages(plant.images || []);
                setDeletedImageIds([]);
                setDeletedPropertyIds([]);
                setNewImages([]);
                setPreviewImages(
                    updatedPlant.images.map((image) => {
                        const url = `http://127.0.0.1:8000/${image.image}`;
                        return url;
                    })
                );
                setMedicinalProperties(
                    updatedPlant.medicinal_properties.map((property) => ({
                        ...property,
                        description: property.description || '',
                    })) || []
                );
            }
        );
        return () => {
            $(`#editPlantModal-${plant.id}`).off('hidden.bs.modal');
        };
    }, [plant]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map((file) => URL.createObjectURL(file));

        setNewImages([...newImages, ...files]);
        setPreviewImages([...previewImages, ...fileUrls]);
    };

    const handleDeleteImage = (i) => {
        if (i < plant.images.length) {
            const image = plant.images[i];
            if (image && image.id) {
                setDeletedImageIds((prevDeletedImageIds) => [
                    ...prevDeletedImageIds,
                    image.id,
                ]);
                console.log(
                    `Programado para eliminar la imagen con ID ${image.id}`
                );

                const newPlantImages = plant.images.filter(
                    (_, index) => index !== i
                );
                plant.images = newPlantImages;
            }
        }

        setPreviewImages(previewImages.filter((_, index) => index !== i));

        if (i >= plant.images.length) {
            const newImageIndex = i - plant.images.length;
            setNewImages(
                newImages.filter((_, index) => index !== newImageIndex)
            );
        }
    };

    const handleDeleteMedicinalProperty = (i) => {
        if (i < plant.medicinal_properties.length) {
            const property = plant.medicinal_properties[i];
            if (property && property.id) {
                setDeletedPropertyIds((prevDeletedPropertyIds) => [
                    ...prevDeletedPropertyIds,
                    property.id,
                ]);
                console.log(
                    `Programado para eliminar la propiedad medicinal con ID ${property.id}`
                );

                const newMedicinalProperties =
                    plant.medicinal_properties.filter(
                        (_, index) => index !== i
                    );
                plant.medicinal_properties = newMedicinalProperties;
            }
        }

        setMedicinalProperties(
            medicinalProperties.filter((_, index) => index !== i)
        );
    };

    const handleMedicinalPropertyChange = (index) => (event) => {
        const newMedicinalProperties = [...medicinalProperties];
        newMedicinalProperties[index] = {
            ...newMedicinalProperties[index],
            description: event.target.value,
        };
        setMedicinalProperties(newMedicinalProperties);
    };

    const addMedicinalProperty = () => {
        setMedicinalProperties([...medicinalProperties, { description: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('scientific_name', scientificName);
        formData.append('description', description);
        formData.append('category_id', parseInt(category));
        medicinalProperties.forEach((property, i) => {
            formData.append(`medicinal_properties[${i}]`, property.description);
        });

        newImages.forEach((image, i) => {
            formData.append(`images[${i}]`, image);
        });

        console.log('medicinalProperties', medicinalProperties);
        console.log('images', newImages);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/plants/${plant.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const deleteImagePromises = deletedImageIds.map((id) =>
                axios
                    .delete(`http://127.0.0.1:8000/api/plants/images/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .catch((error) => {
                        console.log(
                            `Error al eliminar la imagen ${id}:`,
                            error
                        );
                    })
            );

            const deletePropertyPromises = deletedPropertyIds.map((id) =>
                axios
                    .delete(
                        `http://127.0.0.1:8000/api/plants/medicinalProperties/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .catch((error) => {
                        console.log(
                            `Error al eliminar la propiedad medicinal ${id}:`,
                            error
                        );
                    })
            );

            await Promise.all([
                ...deleteImagePromises,
                ...deletePropertyPromises,
            ]);

            $(`#editPlantModal-${plant.id}`).modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al actualizar la planta:', error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target={`#editPlantModal-${plant.id}`}
            >
                Editar
            </button>

            <div
                className="modal fade"
                id={`editPlantModal-${plant.id}`}
                tabIndex="-1"
                aria-labelledby="editPlantModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="motal-title"
                                id="editPlantModalLabel"
                            >
                                Editar Planta
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
                                    <label className="form-label">
                                        Propiedades medicinales:
                                    </label>
                                </div>
                                {medicinalProperties.map((property, i) => (
                                    <div className="row mb-3" key={i}>
                                        <div className="col-4">
                                            <label
                                                htmlFor={`medicinalProperty${i}`}
                                                className="form-label"
                                            >
                                                Propiedad medicinal {i + 1}:
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`medicinalProperty${i}`}
                                                    value={property.description}
                                                    onChange={handleMedicinalPropertyChange(
                                                        i
                                                    )}
                                                    required
                                                />
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteMedicinalProperty(
                                                            i
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-dark mb-3"
                                    onClick={addMedicinalProperty}
                                >
                                    Agregar
                                </button>
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
                                                width: '300px',
                                                height: '300px',
                                            }}
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        `plantImages-${plant.id}`
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
                                                    id={`plantImages-${plant.id}`}
                                                    onChange={handleImageChange}
                                                    accept=".jpeg,.jpg,.png,.gif,.svg"
                                                    multiple
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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteImage(i);
                                                    }}
                                                >
                                                    <i className="bi bi-trash-fill"></i>{' '}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
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

export default EditPlant;
