import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Editinf({ onUpdate, inf }) {
    const [name, setName] = useState(inf.name);
    const [data, setData] = useState(inf.data);
    const [label, setLabel] = useState('Dato');

    useEffect(() => {
        const modal = document.getElementById(`editinfModal-${inf.id}`);
        $(modal).on('hidden.bs.modal', async function () {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/networks/${inf.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setName(response.data.name);
                setData(response.data.data);
            };
            fetchData();
        });

        return () => {
            $(modal).off('hidden.bs.modal');
        };
    }, [inf.id]);

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
            const response = await axios.put(
                `http://127.0.0.1:8000/api/networks/${inf.id}`,
                { name, data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('infrmación actualizada:', { name, data });

            $(`#editinfModal-${inf.id}`).modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al actualizar la infrmacion:', error);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target={`#editinfModal-${inf.id}`}
            >
                Editar
            </button>
            <div
                className="modal fade"
                id={`editinfModal-${inf.id}`}
                tabIndex="-1"
                aria-labelledby="editinfModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="editinfModalLabel">
                                Editar infrmacion
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
                                    infrmacion:
                                </label>
                                <select
                                    name="inf"
                                    id="inf"
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

export default Editinf;
