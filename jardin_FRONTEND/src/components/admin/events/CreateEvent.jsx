import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function CreateEvent({ onUpdate, events }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const patternBase = ")[a-zA-Z0-9 ,\\.:\\-ñ]+$";
    let patternExistentes = "^(";

    useEffect(() => {
        setImageFeedback();
    }, [previewImages]);

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
        let form = document.getElementById("formCrearEvento");
        if (checkDataValidity(form)) {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('description', description);
            images.forEach((image, i) => {
                formData.append(`images[${i}]`, image);
            });

            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/events',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                resetModal();
                $('#createEventModal').modal('hide');
                onUpdate();
            } catch (error) {
                console.log('Error al crear el evento:', error);
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
    }

    const setImageFeedback = () => {
        let form = document.getElementById("formCrearEvento");
        if (form.classList.contains("was-validated")) {
            let textFeedback = document.getElementById("textImgFeedback");
            textFeedback.classList.remove("text-secondary");
            let botonFeedback = document.getElementById("addEventImageFeedback");
            if (images.length == 0) {
                botonFeedback.classList.remove("border-success");
                botonFeedback.classList.add("border-danger");
                textFeedback.classList.remove("text-success");
                textFeedback.classList.add("text-danger");
            } else {
                botonFeedback.classList.remove("border-danger");
                botonFeedback.classList.add("border-success");
                textFeedback.classList.remove("text-danger");
                textFeedback.classList.add("text-success");
            }
        }
    }

    const setNombreFeedback = (nombreEvento) => {
        let feedback = document.getElementById("nombreEventoFeedback");
        let existe = events.find(event => {
            if (event.name.toLowerCase() === nombreEvento.toLowerCase()) {
                let nuevoPattern = patternExistentes + "(?!" + nombreEvento + "$)";
                patternExistentes = nuevoPattern;
                nuevoPattern += patternBase;
                document.getElementById("eventName").setAttribute("pattern", nuevoPattern);
            }
            return event.name.toLowerCase() === nombreEvento.toLowerCase();
        });
        if (existe) {
            feedback.innerText = "Ya existe un evento con este nombre.";
        } else if (nombreEvento != "") {
            feedback.innerText = "No se admiten caracteres especiales.";
        } else {
            feedback.innerText = "El nombre del evento no puede estar vacío.";
        }
    };

    const resetModal = () => {
        document.getElementById("formCrearEvento").classList.remove("was-validated");
        let imgFeedback = document.getElementById("addEventImageFeedback");
        imgFeedback.classList.remove("border-danger");
        imgFeedback.classList.remove("border-success");
        let textFeedback = document.getElementById("textImgFeedback");
        textFeedback.classList.remove("text-danger");
        textFeedback.classList.remove("text-success");
        textFeedback.classList.add("text-secondary");
        setName('');
        setDate('');
        setTime('');
        setDescription('');
        setImages([]);
        setPreviewImages([]);
    };

    return (
        <div>
            <button
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createEventModal"
            >
                Crear evento
            </button>
            <div
                className="modal fade"
                id="createEventModal"
                tabIndex="-1"
                aria-labelledby="createEventModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    {' '}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="createEventModalLabel"
                            >
                                Crear evento
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} className='needs-validation' noValidate id='formCrearEvento'>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label
                                        htmlFor="eventName"
                                        className="form-label"
                                    >
                                        Nombre:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="eventName"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        onKeyUp={e => setNombreFeedback(e.target.value)}
                                        pattern='[a-zA-Z0-9 ,\.:\-ñ]+$'
                                        required
                                    />
                                    <div className="invalid-feedback" id='nombreEventoFeedback'>
                                        El nombre del evento no puede estar vacío.
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label
                                            htmlFor="eventDate"
                                            className="form-label"
                                        >
                                            Fecha:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="eventDate"
                                            min={dayjs().format("YYYY-MM-DD")}
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Debe seleccionar una fecha para el evento.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label
                                            htmlFor="eventTime"
                                            className="form-label"
                                        >
                                            Hora:
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="eventTime"
                                            value={time}
                                            onChange={(e) =>
                                                setTime(e.target.value)
                                            }
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Debe seleccionar una hora para el evento.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="eventDescription"
                                        className="form-label"
                                    >
                                        Descripción:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="eventDescription"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        style={{ resize: "none" }}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        La descripción del evento no puede estar vacía.
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="border rounded"
                                        style={{ minHeight: "200px", maxHeight: "210px", overflowY: "auto", overflowX: 'hidden' }}>
                                        <label
                                            htmlFor="eventImages"
                                            className="form-label p-2"
                                        >
                                            Imagenes:
                                        </label>
                                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 px-3 mb-3">
                                            <div className='col' key="addImage">
                                                <div className='d-flex justify-content-center align-items-center border rounded boton-add-img'
                                                    style={{ width: "140px", height: "140px", backgroundColor: "#e1e7ee", cursor: "pointer" }}
                                                    onClick={() => document.getElementById('eventImages').click()}
                                                    id='addEventImageFeedback'
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
                                            id="eventImages"
                                            onChange={handleImageChange}
                                            accept=".jpeg,.jpg,.png,.gif,.svg"
                                            multiple
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div className='text-secondary mt-2' id='textImgFeedback'>
                                        <small>Se debe subir al menos una imagen.</small>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-end">
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

export default CreateEvent;
