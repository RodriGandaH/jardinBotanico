import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCategory({ category, onUpdate, categories }) {

    const [name, setName] = useState(category.name);
    const [feedback, setFeedBack] = useState("El nombre no puede estar vacio.");
    const [validando, setValidando] = useState(false);
    const [datosValidos, setDatosValidos] = useState(false);
    const idModal = "modalEditarCategoria" + category.id;
    const idLabel = "modalEditarCategoriaLabel" + category.id;
    const idInput = "nombreCategoria" + category.id;


    useEffect(() => {
        setName(category.name);
    }, [category]);

    const handleEdit = async (event) => {
        event.preventDefault();
        if (primeraValidacion() || datosValidos) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/categories/${category.id}`,
                    { name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setName('');
                $('#' + idModal).modal('hide');
                onUpdate();
                resetModalData();
            } catch (error) {
                console.log('Error al editar la categoría:', error);
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
        nombreCategoria = nombreCategoria === "" ? name : nombreCategoria;
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
            document.getElementById(idInput).classList.remove("is-invalid");
            document.getElementById(idInput).classList.add("is-valid");
        } else {
            document.getElementById(idInput).classList.remove("is-valid");
            document.getElementById(idInput).classList.add("is-invalid");
        }
        return valido;
    }

    const resetModalData = () => {
        document.getElementById(idInput).classList.remove("is-valid");
        document.getElementById(idInput).classList.remove("is-invalid");
        setValidando(false);
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#" + idModal}>
                Editar
            </button>

            <div className="modal fade" data-bs-backdrop='static' id={idModal} tabIndex="-1" aria-labelledby={idLabel} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={idLabel}>Editar categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetModalData}></button>
                        </div>
                        <form onSubmit={handleEdit}>
                            <div className="modal-body">
                                <label htmlFor={idInput} className="form-label">Nombre:</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    id={idInput}
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetModalData}>Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCategory;
