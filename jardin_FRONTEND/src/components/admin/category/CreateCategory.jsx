import { useState } from 'react';
import axios from 'axios';

function CreateCategory({ onUpdate, categories }) {

    const [name, setName] = useState('');
    const [feedback, setFeedBack] = useState("El nombre no puede estar vacio.");
    const patternBase = ")[a-zA-Z0-9]*";
    let patternExistentes = "^(";

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = document.getElementById("formCrearCategoria");
        if (form.checkValidity()) {
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
        } else {
            form.classList.add('was-validated');
        }
    };

    const nameChange = (nombreCategoria) => {
        let existe = categories.find(category => {
            if (category.name === nombreCategoria) {
                let nuevoPattern = patternExistentes + "(?!" + nombreCategoria + "$)";
                patternExistentes = nuevoPattern;
                nuevoPattern += patternBase;
                document.getElementById("nombreCategoria").setAttribute("pattern", nuevoPattern);
                setFeedBack("EL nombre de categoría ingresado ya existe.");
            }
            return category.name === nombreCategoria;
        });
        if (existe) {
            setFeedBack("Ya existe una categoría con este nombre.");
        } else if (nombreCategoria != "") {
            setFeedBack("No se admiten caracteres especiales.");
        } else {
            setFeedBack("El nombre no puede estar vacio.");
        }
    };

    const resetModalData = () => {
        let form = document.getElementById("formCrearCategoria");
        form.classList.remove("was-validated");
        setName("");
        document.getElementById("nombreCategoria").value = "";
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
                        <form noValidate onSubmit={handleSubmit} id="formCrearCategoria" className='needs-validation'>
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
                                    pattern='[a-zA-Z0-9]*'
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
