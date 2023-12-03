import React, { useState } from 'react';
import axios from 'axios';

function EditEvent({ event, onUpdate, id }) {
    const [name, setName] = useState(event.name);
    const [date, setDate] = useState(event.date);
    const [time, setTime] = useState(event.time);
    const [description, setDescription] = useState(event.description);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState(
        event.images.map((image) => {
            const url = `http://127.0.0.1:8000/${image.image}`;
            return url;
        })
    );

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
        const image = images[index];
        console.log('Imagen a eliminar:', image);
        if (image && image.id) {
            console.log('ID de la imagen:', image.id);
            const token = localStorage.getItem('token');
            try {
                axios.delete(
                    `http://127.0.0.1:8000/api/events/images/${image.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Imagen eliminada');
            } catch (error) {
                console.log('Error al eliminar la imagen:', error);
            }
        }
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('description', description);
        images.forEach((image, i) => {
            if (image instanceof File) {
                formData.append(`images[${i}]`, image);
            }
        });

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/events/${event.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            $('#editEventModal').modal('hide');
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
                data-bs-target={`#editEventModal-${event.id}`}
                onClick={() => {
                    console.log(event);
                }}
            >
                Editar
            </button>

            <div
                className="modal fade"
                id={`editEventModal-${id}`}
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
                                    <div className="col">
                                        <label
                                            htmlFor="eventImages"
                                            className="form-label"
                                        >
                                            Imagenes:
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="eventImages"
                                            onChange={handleImageChange}
                                            accept=".jpeg,.jpg,.png,.gif,.svg"
                                            multiple
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap">
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
                                                onClick={(event) =>
                                                    removeImage(
                                                        i,
                                                        event.images[i]?.id
                                                    )
                                                }
                                            >
                                                <i className="bi bi-trash-fill"></i>{' '}
                                            </button>
                                        </div>
                                    ))}
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
