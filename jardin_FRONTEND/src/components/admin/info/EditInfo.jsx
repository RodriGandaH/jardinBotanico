import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Editinf({ onUpdate, inf }) {
    const [name, setName] = useState(inf.name);
    const [data, setData] = useState(inf.data);
    const [label, setLabel] = useState('Dato');
    const idForm = "idFormEditarInfo" + inf.id;
    const idData = "idDataEditarInfo" + inf.id;
    const idFeedback = "idFeedbackEditarInfo" + inf.id;

    useEffect(() => {
        let input = document.getElementById(idData);
        let dataFeedback = document.getElementById(idFeedback);
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
        let form = document.getElementById(idForm);
        if (form.checkValidity()) {
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
                resetModal()
                $(`#editinfModal-${inf.id}`).modal('hide');
                onUpdate();
            } catch (error) {
                console.log('Error al actualizar la infrmacion:', error);
            }
        } else {
            form.classList.add("was-validated");
        }
    };

    const resetModal = async () => {
        document.getElementById(idForm).classList.remove("was-validated");
        document.getElementById(idData).setAttribute("type", "text");
        document.getElementById(idFeedback).setAttribute("pattern", "");
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
        setLabel('Dato');
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
                            <h1
                                className="modal-title fs-5"
                                id="editinfModalLabel"
                            >
                                Editar informacion
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="close"
                                onClick={resetModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} className='needs-validation' noValidate id={idForm}>
                            <div className="modal-body">
                                <label htmlFor={"inf" + inf.id} className="form-label">
                                    Información:
                                </label>
                                <select
                                    name="inf"
                                    id={"inf" + inf.id}
                                    className="form-select mb-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled
                                    required
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
                                <div className="invalid-feedback">
                                    Debe seleccionar una opción valida.
                                </div>
                                <label htmlFor={idData} className="form-label">
                                    {label}:
                                </label>
                                <input
                                    id={idData}
                                    type="text"
                                    className="form-control"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback" id={idFeedback}>

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

export default Editinf;
