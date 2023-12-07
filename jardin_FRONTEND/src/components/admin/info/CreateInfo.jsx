import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateInfo({ onUpdate, info }) {
    const [name, setName] = useState('');
    const [data, setData] = useState('');
    const [label, setLabel] = useState('Dato');

    useEffect(() => {
        $('#createInfoModal').on('hidden.bs.modal', function () {
            setName('');
            setData('');
            setLabel('Dato');
        });
    }, []);

    useEffect(() => {
        switch (name) {
            case 'Email':
                setLabel('Correo');
                break;
            case 'Telefono':
                setLabel('Número');
                break;
            case 'Facebook':
            case 'Instagram':
            case 'Twitter':
                setLabel('URL');
                break;
            default:
                setLabel('Dato');
        }
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/networks',
                { name, data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Información enviada:', { name, data });

            $('#createInfoModal').modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al crear la informacion:', error);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createInfoModal"
            >
                Registrar Informacion
            </button>
            <div
                className="modal fade"
                id="createInfoModal"
                tabIndex="-1"
                aria-labelledby="createInfoModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="createInfoModalLabel"
                            >
                                Crear informacion
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="close"
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label htmlFor="name" className="form-label">
                                    Informacion:
                                </label>
                                <select
                                    name="info"
                                    id="info"
                                    className="form-select mb-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                    <option value="">
                                        Seleccione una opción
                                    </option>
                                    <option value="Email">Email</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Telefono">Telefono</option>
                                    <option value="Twitter">Twitter</option>
                                </select>
                                <label htmlFor="url" className="form-label">
                                    {label}:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
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
        </>
    );
}

export default CreateInfo;
