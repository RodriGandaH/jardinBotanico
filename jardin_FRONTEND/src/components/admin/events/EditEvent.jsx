import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function EditEvent({ event, onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(event.name);
    const [date, setDate] = useState(event.date);
    const [time, setTime] = useState(event.time);
    const [description, setDescription] = useState(event.description);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        `http://localhost:8000/${event.image}`
    );

    let eventId = event.id;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
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
        formData.append('date', date);
        formData.append('time', time);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        console.log('id del evento:', eventId);
        try {
            const response = await axios.post(
                `http://localhost:8000/api/events/${eventId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Evento actualizado:', response.data);
            closeModal();
            onUpdate();
        } catch (error) {
            console.log('Error al actualizar el evento:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Editar evento</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar evento"
            >
                <h2>Editar evento</h2>
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
                        Fecha:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Hora:
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
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
                        Imagen:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept=".jpeg,.jpg,.png,.gif,.svg"
                        />
                    </label>
                    <button type="submit">Guardar</button>
                </form>
                <button onClick={closeModal}>Cerrar</button>
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

export default EditEvent;
