import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Plants.css'

function CreatePlant({ onUpdate, plants }) {
    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [medicinalProperties, setMedicinalProperties] = useState([]);
    const patternBase = ")[a-zA-Z0-9 ,\\.:\\-ñ]+$";
    let patternExistentes = "^(";

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
        setImageFeedback();
    }, [images]);

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

    const handleMedicinalPropertyChange = (index) => (event) => {
        const newMedicinalProperties = [...medicinalProperties];
        newMedicinalProperties[index] = event.target.value;
        setMedicinalProperties(newMedicinalProperties);
    };

    const addMedicinalProperty = () => {
        setMedicinalProperties([...medicinalProperties, '']);
    };

    const removeMedicinalProperty = (index) => () => {
        setMedicinalProperties(
            medicinalProperties.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = document.getElementById("formCrearPlanta");
        if (checkDataValidity(form)) {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('scientific_name', scientificName);
            formData.append('description', description);
            formData.append('category_id', parseInt(category));
            medicinalProperties.forEach((property, i) => {
                formData.append(`medicinal_properties[${i}]`, property);
            });
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
                resetModal();
                $('#createPlantModal').modal('hide');
                onUpdate();
            } catch (error) {
                console.log('Error al crear la planta:', error);
            }
        } else {
            form.classList.add("was-validated");
            setImageFeedback();
        }
    };

    const checkDataValidity = (form) => {
        let valid = form.checkValidity() && images.length > 0;
        return valid;
    }

    const setImageFeedback = () => {
        let form = document.getElementById("formCrearPlanta");
        if (form.classList.contains("was-validated")) {
            if (images.length == 0) {
                document.getElementById("addImageFeedback").classList.remove("border-success");
                document.getElementById("addImageFeedback").classList.add("border-danger");
            } else {
                document.getElementById("addImageFeedback").classList.remove("border-danger");
                document.getElementById("addImageFeedback").classList.add("border-success");
            }
        }
    }

    const setNombreFeedback = (nombrePlanta) => {
        let feedback = document.getElementById("nombrePlantaFeedback");
        let existe = plants.find(planta => {
            if (planta.name.toLowerCase() === nombrePlanta.toLowerCase()) {
                let nuevoPattern = patternExistentes + "(?!" + nombrePlanta + "$)";
                patternExistentes = nuevoPattern;
                nuevoPattern += patternBase;
                document.getElementById("plantName").setAttribute("pattern", nuevoPattern);
            }
            return planta.name.toLowerCase() === nombrePlanta.toLowerCase();
        });
        if (existe) {
            feedback.innerText = "Ya existe una planta con este nombre.";
        } else if (nombrePlanta != "") {
            feedback.innerText = "No se admiten caracteres especiales.";
        } else {
            feedback.innerText = "El nombre no puede estar vacio.";
        }
    };

    const resetModal = () => {
        document.getElementById("formCrearPlanta").classList.remove("was-validated");
        let imgFeedback = document.getElementById("addImageFeedback");
        imgFeedback.classList.remove("border-danger");
        imgFeedback.classList.remove("border-success");
        setName('');
        setScientificName('');
        setDescription('');
        setCategory('');
        setImages([]);
        setPreviewImages([]);
        setMedicinalProperties([]);
    };

    return (
        <div>
            <button
                className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createPlantModal"
            >
                Registrar planta
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
                                Registrar Planta
                            </h5>
                            <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} noValidate className='needs-validation' id='formCrearPlanta'>
                            <div className="modal-body">
                                <div className="row mb-2">
                                    <div className="col-md-6">
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
                                            onKeyUp={e => setNombreFeedback(e.target.value)}
                                            pattern='[a-zA-Z0-9 ,\.:\-ñ]+$'
                                            required
                                        />
                                        <div className="invalid-feedback" id='nombrePlantaFeedback'>
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
                                            pattern='[a-zA-Z0-9 ,\.:\-ñ]+$'
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            El nombre científico no puede estar vacio.
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-2 col-md-6">
                                        <div className="col-md-12 mb-2">
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
                                            <div className="invalid-feedback" id='nombrePlanta'>
                                                Debe seleccionar una categoría.
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
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
                                                style={{ resize: "none" }}
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
                                                {medicinalProperties.map((property, index) => (
                                                    <div className="col-md-12 px-2" key={index}>
                                                        <label
                                                            htmlFor={`medicinalProperty${index}`}
                                                            className="form-label"
                                                        >
                                                            Propiedad medicinal {index + 1}:
                                                        </label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id={`medicinalProperty${index}`}
                                                                value={property}
                                                                onChange={handleMedicinalPropertyChange(
                                                                    index
                                                                )}
                                                                required
                                                            />
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={removeMedicinalProperty(
                                                                    index
                                                                )}
                                                            >
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-outline-success my-3 ms-2"
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
                                                        id='addImageFeedback'
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
                                                                onClick={(event) =>
                                                                    removeImage(i)(event)
                                                                }
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
                                                id="plantImages"
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
                                    className="btn btn-success"
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
