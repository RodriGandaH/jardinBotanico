import { useState } from 'react';
import axios from 'axios';

function CreateCategory({ onUpdate, categories }) {

    const [name, setName] = useState('');
    const [feedback, setFeedBack] = useState("El nombre no puede estar vacio.");
    const [validando, setValidando] = useState(false);
    const [datosValidos, setDatosValidos] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (primeraValidacion() || datosValidos) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/categories',
                    { name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setName('');
                $('#modalCrearCategoria').modal('hide');
                onUpdate();
                resetModalData();
            } catch (error) {
                console.log('Error al crear la categoría:', error);
            }
        }
    };

    const nameChange = (nombreCategoria) => {
        if (validando) {
            setDatosValidos(nombreCategoriaValido(nombreCategoria));
        }
    };

    const primeraValidacion = () => {
        if (!validando) {
            setValidando(true);
            let nombreCategoria = document.getElementById("nombreCategoria").value;
            return nombreCategoriaValido(nombreCategoria);
        } else {
            return false;
        }
    }

    const nombreCategoriaValido = (nombreCategoria) => {
        nombreCategoria = nombreCategoria.trim();
        let valido = nombreCategoria != "";
        if (valido) {
            categories.map(category => {
                if (category.name === nombreCategoria) {
                    valido = false;
                    setFeedBack("EL nombre de categoría ingresado ya existe.");
                }
            });
        } else {
            setFeedBack("El nombre no puede estar vacio.");
        }
        if (valido) {
            document.getElementById("nombreCategoria").classList.remove("is-invalid");
            document.getElementById("nombreCategoria").classList.add("is-valid");
        } else {
            document.getElementById("nombreCategoria").classList.remove("is-valid");
            document.getElementById("nombreCategoria").classList.add("is-invalid");
        }
        return valido;
    }

    const resetModalData = () => {
        document.getElementById('nombreCategoria').value = '';
        document.getElementById("nombreCategoria").classList.remove("is-valid");
        document.getElementById("nombreCategoria").classList.remove("is-invalid");
        setValidando(false);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalCrearCategoria"
            >
                Registrar categoría
            </button>

            <div
                className="modal fade"
                data-bs-backdrop="static"
                id="modalCrearCategoria"
                tabIndex="-1"
                aria-labelledby="modalCrearCategoriaLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="modalCrearCategoriaLabel"
                            >
                                Crear categoría
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={resetModalData}
                                aria-label="Close"
                            ></button>
                        </div>
                        <form noValidate onSubmit={handleSubmit} id="formCrearCategoria">
                            <div className="modal-body">
                                <label
                                    htmlFor="nombreCategoria"
                                    className="form-label"
                                >
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreCategoria"
                                    placeholder="Ingrese un nombre..."
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyUp={e => nameChange(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    {feedback}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={resetModalData}
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

export default CreateCategory;
