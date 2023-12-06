import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditEvent({ event: evento, onUpdate }) {
    const [name, setName] = useState(evento.name);
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

    const [deletedImageIds, setDeletedImageIds] = useState([]);

    useEffect(() => {
        const modal = document.getElementById(`editEventModal-${evento.id}`);
        $(modal).on('hidden.bs.modal', async function () {
            // Se esta usando get porque no encontre como hacer que vuelva a como estaban la vista previa de imagenes despues de cerrar si esque elimino pero no guardo
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
        });
        return () => {
            $(modal).off('hidden.bs.modal');
        };
    }, [evento]);

    const handleImageChange = (e) => {
        setNewImages([...newImages, ...e.target.files]);
        setPreviewImages([
            ...previewImages,
            ...Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            ),
        ]);
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

            onUpdate();
        } catch (error) {
            console.log('Error al actualizar el evento:', error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#editEventModal-${evento.id}`}
                onClick={() => {
                    console.log(evento);
                }}
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
                <div className="modal-dialog modal-xl">
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
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                        required
                                    />
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
                                        required
                                    />
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
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            required
                                        />
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
                                    </div>
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor="eventImages"
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
                                                        `eventImages-${evento.id}`
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
                                                    id={`eventImages-${evento.id}`}
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
                                                        width: '300px',
                                                        height: '300px',
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

export default EditEvent;
