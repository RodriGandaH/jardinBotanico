import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function CreateEvent({ onUpdate }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setName('');
        setDate('');
        setTime('');
        setDescription('');
        setImage(null);
        setPreviewImage(null);
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

        try {
            const response = await axios.post(
                'https://apijardin.fly.dev/api/events',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            closeModal();
            onUpdate();
        } catch (error) {
            console.log('Error al crear el evento:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Crear evento</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crear evento"
            >
                <h2>Crear evento</h2>
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
                            required
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

export default CreateEvent;
