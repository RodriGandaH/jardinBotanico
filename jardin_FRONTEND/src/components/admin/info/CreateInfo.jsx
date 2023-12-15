import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateInfo({ onUpdate, info }) {
    const [name, setName] = useState('');
    const [data, setData] = useState('');
    const [label, setLabel] = useState('Dato');
    const opciones = ["Email", "Facebook", "Instagram", "Telefono", "Twitter"];

    useEffect(() => {
        let input = document.getElementById("dato");
        let dataFeedback = document.getElementById("infoDataFeedback");
        switch (name) {
            case 'Email':
                input.setAttribute("type", "email")
                input.setAttribute("pattern", ".+@.+\\..{2,4}$");
                dataFeedback.innerText = "Correo electrónico no válido";
                setLabel('Correo');
                break;
            case 'Telefono':
                input.setAttribute("type", "tel")
                input.setAttribute("pattern", "[0-9]{7,9}");
                dataFeedback.innerText = "Número telefónico no válido";
                setLabel('Número');
                break;
            case 'Facebook':
                input.setAttribute("type", "url")
                input.setAttribute("pattern", "https://www.facebook.com/.+");
                dataFeedback.innerText = "Enlace a Facebook no válido.";
                setLabel('URL');
                break;
            case 'Instagram':
                input.setAttribute("type", "url")
                input.setAttribute("pattern", "https://www.instagram.com/.+");
                dataFeedback.innerText = "Enlace a Instagram no válido.";
                setLabel('URL');
                break;
            case 'Twitter':
                input.setAttribute("type", "url")
                input.setAttribute("pattern", "https://twitter.com/.+");
                dataFeedback.innerText = "Enlace a Twitter no válido.";
                setLabel('URL');
                break;
            default:
                input.setAttribute("type", "text")
                input.setAttribute("pattern", "");
                dataFeedback.innerText = "";
                setLabel('Dato');
        }
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = document.getElementById("formCrearInfo");
        if (form.checkValidity()) {
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
                resetModal();
                $('#createInfoModal').modal('hide');
                onUpdate();
            } catch (error) {
                console.log('Error al crear la informacion:', error);
            }
        } else {
            form.classList.add("was-validated");
        }
    };

    const resetModal = () => {
        document.getElementById("formCrearInfo").classList.remove("was-validated");
        document.getElementById("dato").setAttribute("type", "text");
        document.getElementById("infoDataFeedback").setAttribute("pattern", "");
        setName('');
        setData('');
        setLabel('Dato');
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createInfoModal"
                disabled={info.length === 5}
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
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} className='needs-validation' noValidate id='formCrearInfo'>
                            <div className="modal-body">
                                <label htmlFor="name" className="form-label">
                                    Información:
                                </label>
                                <select
                                    name="info"
                                    id="info"
                                    className="form-select mb-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                >
                                    <option value="">
                                        Seleccione una opción
                                    </option>
                                    {opciones.map(opcion => {
                                        let usado = info.find(inf => inf.name === opcion);
                                        if (!usado) {
                                            return <option value={opcion}>{opcion}</option>
                                        }
                                    })}
                                </select>
                                <div className="invalid-feedback">
                                    Debe seleccionar una opción valida.
                                </div>
                                <label htmlFor="dato" className="form-label">
                                    {label}:
                                </label>
                                <input
                                    id='dato'
                                    type="text"
                                    className="form-control"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback" id='infoDataFeedback'>

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
            </div>
        </>
    );
}

export default CreateInfo;
