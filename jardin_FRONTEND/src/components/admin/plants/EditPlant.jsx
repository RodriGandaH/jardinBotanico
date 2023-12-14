import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Plants.css'

function EditPlant({ plant, onUpdate, plants }) {
    const [name, setName] = useState(plant.name);
    const originalName = plant.name;
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
    const idForm = "formEditarPlanta" + plant.id;
    const idImgFeedback = "editImgFeedback" + plant.id;
    const idNombrePlanta = "editNombrePlanta" + plant.id;
    const idNombrePlantaFeedback = "editNombreFeedback" + plant.id;
    const patternBase = ")[a-zA-Z0-9 ,\\.:\\-]+$";
    let patternExistentes = "^(";

    const fetchCategories = async () => {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/categories/getCategories'
        );
        setCategories(response.data);
    };

    useEffect(() => {
        setImageFeedback();
    }, [previewImages]);

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
        let form = document.getElementById(idForm);
        if (checkDataValidity(form)) {
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
                resetModal();
                $(`#editPlantModal-${plant.id}`).modal('hide');
                onUpdate();
            } catch (error) {
                console.log('Error al actualizar la planta:', error);
            }
        } else {
            form.classList.add("was-validated");
            setImageFeedback();
        }

    };

    const checkDataValidity = (form) => {
        setNombreFeedback(name);
        let valid = form.checkValidity() && previewImages.length > 0;
        return valid;
    };

    const setImageFeedback = () => {
        let form = document.getElementById(idForm);
        if (form.classList.contains("was-validated")) {
            let imgFeedback = document.getElementById(idImgFeedback);
            if (previewImages.length == 0) {
                imgFeedback.classList.remove("border-success");
                imgFeedback.classList.add("border-danger");
            } else {
                imgFeedback.classList.remove("border-danger");
                imgFeedback.classList.add("border-success");
            }
        }
    };

    const setNombreFeedback = (nombrePlanta) => {
        let feedback = document.getElementById(idNombrePlantaFeedback);
        let existe = null;
        if (originalName.toLowerCase() != nombrePlanta.toLowerCase()) {
            existe = plants.find(planta => {
                if (planta.name.toLowerCase() === nombrePlanta.toLowerCase()) {
                    let nuevoPattern = patternExistentes + "(?!" + nombrePlanta + "$)";
                    patternExistentes = nuevoPattern;
                    nuevoPattern += patternBase;
                    document.getElementById(idNombrePlanta).setAttribute("pattern", nuevoPattern);
                }
                return planta.name.toLowerCase() === nombrePlanta.toLowerCase();
            });
        }
        if (existe) {
            feedback.innerText = "Ya existe una planta con este nombre.";
        } else if (nombrePlanta != "") {
            feedback.innerText = "No se admiten caracteres especiales.";
        } else {
            feedback.innerText = "El nombre no puede estar vacio.";
        }
    };

    const resetModal = async () => {
        document.getElementById(idForm).classList.remove("was-validated");
        let imgFeedback = document.getElementById(idImgFeedback);
        imgFeedback.classList.remove("border-danger");
        imgFeedback.classList.remove("border-success");
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
    };

    return (
        <div>
            <button
                className="btn btn-primary me-2"
                data-bs-toggle="modal"
                data-bs-target={`#editPlantModal-${plant.id}`}
                onClick={fetchCategories}
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
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} noValidate className='needs-validation' id={idForm}>
                            <div className="modal-body">
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <label
                                            htmlFor={idNombrePlanta}
                                            className="form-label"
                                        >
                                            Nombre:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={idNombrePlanta}
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            onKeyUp={e => setNombreFeedback(e.target.value)}
                                            pattern='[a-zA-Z0-9 ,\.:\-]+$'
                                            required
                                        />
                                        <div className="invalid-feedback" id={idNombrePlantaFeedback}>
                                            El nombre no puede estar vacio.
                                        </div>
                                    </div>
                                    <div className="col-md-6">
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
                                            pattern='[a-zA-Z0-9 ,\.:\-]+$'
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            El nombre científico no puede estar vacio.
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <div className="mb-2 col-md-12">
                                            <label
                                                htmlFor="category"
                                                className="form-label"
                                            >
                                                Categoría:
                                            </label>
                                            <select
                                                className="form-select h-50"
                                                id="category"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                required
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
                                            <div className="invalid-feedback">
                                                Debe seleccionar una categoría.
                                            </div>
                                        </div>
                                        <div className="mb-2 col-md-12">
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
                                                required
                                                style={{resize: "none"}}
                                            ></textarea>
                                            <div className="invalid-feedback">
                                                La descripción no puede estar vacia.
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2 border rounded">
                                            <label className="form-label p-2">
                                                Propiedades medicinales:
                                            </label>
                                            <div className='px-2' style={{ maxHeight: "140px", overflowY: "auto" }}>
                                                {medicinalProperties.map((property, i) => (
                                                    <div className="col-md-12 px-2" key={i}>
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
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-dark my-3 ms-2"
                                                onClick={addMedicinalProperty}
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                        <div className='text-secondary'>
                                            Las propiedades medicinales son opcionales.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="border rounded"
                                            style={{ minHeight: "318px", maxHeight: "457px", overflowY: "auto", overflowX: 'hidden' }}>
                                            <label
                                                htmlFor="plantImages"
                                                className="form-label p-2"
                                            >
                                                Imagenes:
                                            </label>
                                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-3 mb-3">
                                                <div className='col' key="addImage">
                                                    <div className='d-flex justify-content-center align-items-center border rounded boton-add-img'
                                                        style={{ width: "140px", height: "140px", backgroundColor: "#e1e7ee", cursor: "pointer" }}
                                                        onClick={() => document.getElementById('plantImages').click()}
                                                        id={idImgFeedback}
                                                    >
                                                        <i className="bi bi-plus-lg h1"></i>
                                                    </div>
                                                </div>
                                                {previewImages.map((url, i) => (
                                                    <div key={i} className="col">
                                                        <div className='d-flex justify-content-center align-items-center border rounded position-relative'
                                                            style={{ width: "140px", height: "140px" }}>
                                                            <img
                                                                src={url}
                                                                alt={`Vista previa de la imagen seleccionada ${i + 1}`}
                                                                style={{
                                                                    maxWidth: '140px',
                                                                    maxHeight: '140px',
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
                                                    </div>
                                                ))}
                                            </div>
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
                                        <div className='text-secondary mt-2'>
                                            Se debe subir al menos una imagen.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={resetModal}
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
