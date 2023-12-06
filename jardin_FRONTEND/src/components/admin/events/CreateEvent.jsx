import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateEvent({ onUpdate }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        $('#createEventModal').on('hidden.bs.modal', function () {
            setName('');
            setDate('');
            setTime('');
            setDescription('');
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

            $('#createEventModal').modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al crear el evento:', error);
        }
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
                <div className="modal-dialog modal-xl">
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
                                                width: '250px',
                                                height: '250px',
                                            }}
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        'eventImages'
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
                                                    id="eventImages"
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

export default CreateEvent;
