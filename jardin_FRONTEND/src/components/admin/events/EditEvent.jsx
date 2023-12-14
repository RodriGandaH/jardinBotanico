import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function EditEvent({ event: evento, onUpdate, events }) {
    const [name, setName] = useState(evento.name);
    const originalName = evento.name;
    const [date, setDate] = useState(evento.date);
    const [time, setTime] = useState(evento.time);
    const [description, setDescription] = useState(evento.description);
    const [newImages, setNewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState(
        evento.images.map((image) => {
            const url = `http://127.0.0.1:8000/${image.image}`;
            return url;
        })
    );
    const idFormEditar = "formEditarEvento" + evento.id;
    const idNombreEvento = "nombreEventoEditar" + evento.id;
    const idFeedbackNombreEvento = "nombreEventoEditarFeedback" + evento.id;
    const idAddImgButton = "botonImgEditar" + evento.id;
    const idTextImgFeedback = "textImgEditarFeedback" + evento.id;
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const patternBase = ")[a-zA-Z0-9 ,\\.:\\-]+$";
    let patternExistentes = "^(";

    useEffect(() => {
        setImageFeedback();
    }, [previewImages]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map((file) => URL.createObjectURL(file));

        setNewImages([...newImages, ...files]);
        setPreviewImages([...previewImages, ...fileUrls]);
    };
    const handleDelete = (i) => {
        if (i < evento.images.length) {
            const image = evento.images[i];
            if (image && image.id) {
                setDeletedImageIds((prevDeletedImageIds) => [
                    ...prevDeletedImageIds,
                    image.id,
                ]);
                console.log(
                    `Programado para eliminar la imagen con ID ${image.id}`
                );

                const newEventoImages = evento.images.filter(
                    (_, index) => index !== i
                );
                evento.images = newEventoImages;
            }
        }

        setPreviewImages(previewImages.filter((_, index) => index !== i));

        if (i >= evento.images.length) {
            const newImageIndex = i - evento.images.length;
            setNewImages(
                newImages.filter((_, index) => index !== newImageIndex)
            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = document.getElementById(idFormEditar);
        if (checkDataValidity(form)) {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('description', description);
            newImages.forEach((image, i) => {
                if (image instanceof File) {
                    formData.append(`images[${i}]`, image);
                }
            });

            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/events/${evento.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                for (const id of deletedImageIds) {
                    try {
                        await axios.delete(
                            `http://127.0.0.1:8000/api/events/images/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                    } catch (error) {
                        console.log(`Error al eliminar la imagen ${id}:`, error);
                    }
                }
                $(`#editEventModal-${evento.id}`).modal('hide');
                resetModal();
                onUpdate();
            } catch (error) {
                console.log('Error al actualizar el evento:', error);
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
        let form = document.getElementById(idFormEditar);
        if (form.classList.contains("was-validated")) {
            let textFeedback = document.getElementById(idTextImgFeedback);
            textFeedback.classList.remove("text-secondary");
            let botonFeedback = document.getElementById(idAddImgButton);
            if (previewImages.length == 0) {
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
        let feedback = document.getElementById(idFeedbackNombreEvento);
        let existe = null;
        if (originalName.toLowerCase() != nombreEvento.toLowerCase()) {
            existe = events.find(event => {
                if (event.name.toLowerCase() === nombreEvento.toLowerCase()) {
                    let nuevoPattern = patternExistentes + "(?!" + nombreEvento + "$)";
                    patternExistentes = nuevoPattern;
                    nuevoPattern += patternBase;
                    document.getElementById(idNombreEvento).setAttribute("pattern", nuevoPattern);
                }
                return event.name.toLowerCase() === nombreEvento.toLowerCase();
            });
        }
        if (existe) {
            feedback.innerText = "Ya existe un evento con este nombre.";
        } else if (nombreEvento != "") {
            feedback.innerText = "No se admiten caracteres especiales.";
        } else {
            feedback.innerText = "El nombre del evento no puede estar vacío.";
        }
    };

    const resetModal = async () => {
        document.getElementById(idFormEditar).classList.remove("was-validated");
        let imgFeedback = document.getElementById(idAddImgButton);
        imgFeedback.classList.remove("border-danger");
        imgFeedback.classList.remove("border-success");
        let textFeedback = document.getElementById(idTextImgFeedback);
        textFeedback.classList.remove("text-danger");
        textFeedback.classList.remove("text-success");
        textFeedback.classList.add("text-secondary");
        const response = await axios.get(
            `http://127.0.0.1:8000/api/events/${evento.id}`
        );
        const updatedEvento = response.data;
        setName(evento.name);
        setDate(evento.date);
        setTime(evento.time);
        setDescription(evento.description);
        setNewImages([]);
        setDeletedImageIds([]);
        setPreviewImages(
            updatedEvento.images.map((image) => {
                const url = `http://127.0.0.1:8000/${image.image}`;
                return url;
            })
        );
    };

    return (
        <div>
            <button
                className="btn btn-primary me-2"
                data-bs-toggle="modal"
                data-bs-target={`#editEventModal-${evento.id}`}
            >
                Editar
            </button>

            <div
                className="modal fade"
                id={`editEventModal-${evento.id}`}
                tabIndex="-1"
                aria-labelledby="editEventModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="editEventModalLabel"
                            >
                                Editar evento
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form id={idFormEditar} onSubmit={handleSubmit} className='needs-validation' noValidate>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label
                                        htmlFor={idNombreEvento}
                                        className="form-label"
                                    >
                                        Nombre:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={idNombreEvento}
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        onKeyUp={e => setNombreFeedback(e.target.value)}
                                        pattern='[a-zA-Z0-9 ,\.:\-]+$'
                                        required
                                    />
                                    <div className="invalid-feedback" id={idFeedbackNombreEvento}>
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
                                                    onClick={() => document.getElementById("editEventImg" + evento.id).click()}
                                                    id={idAddImgButton}
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
                                                                handleDelete(i);
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
                                            id={"editEventImg" + evento.id}
                                            onChange={handleImageChange}
                                            accept=".jpeg,.jpg,.png,.gif,.svg"
                                            multiple
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div className='text-secondary mt-2' id={idTextImgFeedback}>
                                        <small>Se debe subir al menos una imagen.</small>
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
            </div >
        </div >
    );
}

export default EditEvent;
