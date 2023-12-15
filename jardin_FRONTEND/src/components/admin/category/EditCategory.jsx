import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCategory({ category, onUpdate, categories }) {

    const [name, setName] = useState(category.name);
    const originalName = category.name;
    const [feedback, setFeedBack] = useState("El nombre no puede estar vacio.");
    const idModal = "modalEditarCategoria" + category.id;
    const idLabel = "modalEditarCategoriaLabel" + category.id;
    const idInput = "nombreCategoria" + category.id;
    const idForm = "formCategoria" + category.id;
    const patternBase = ")[a-zA-Z0-9 ,\\.:\\-ñ]+$";
    let patternExistentes = "^(";


    useEffect(() => {
        setName(category.name);
    }, [category]);

    const handleEdit = async (event) => {
        event.preventDefault();
        let form = document.getElementById(idForm);
        nameChange(name);
        if (form.checkValidity()) {
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
                $('#' + idModal).modal('hide');
                onUpdate();
                resetModalData();
            } catch (error) {
                console.log('Error al editar la categoría:', error);
            }
        } else {
            form.classList.add('was-validated');
        }
    };

    const nameChange = (nombreCategoria) => {
        let existe = null;
        if (originalName.toLowerCase() != nombreCategoria.toLowerCase()) {
            existe = categories.find(category => {
                if (category.name.toLowerCase() === nombreCategoria.toLowerCase()) {
                    let nuevoPattern = patternExistentes + "(?!" + nombreCategoria + "$)";
                    patternExistentes = nuevoPattern;
                    nuevoPattern += patternBase;
                    document.getElementById(idInput).setAttribute("pattern", nuevoPattern);
                }
                return category.name.toLowerCase() === nombreCategoria.toLowerCase();
            });
        }
        if (existe) {
            setFeedBack("Ya existe una categoría con este nombre.");
        } else if (nombreCategoria != "") {
            setFeedBack("No se admiten caracteres especiales.");
        } else {
            setFeedBack("El nombre no puede estar vacio.");
        }
    };

    const resetModalData = () => {
        let form = document.getElementById(idForm);
        form.classList.remove("was-validated");
        setName(category.name);
        document.getElementById(idInput).value = "";
    };

    return (
        <>
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target={"#" + idModal}>
                Editar
            </button>

            <div className="modal fade" data-bs-backdrop='static' id={idModal} tabIndex="-1" aria-labelledby={idLabel} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={idLabel}>Editar categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetModalData}></button>
                        </div>
                        <form onSubmit={handleEdit} id={idForm} noValidate className='needs-validation'>
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
                                    pattern='[a-zA-Z0-9 ,\.:\-ñ]+$'
                                    required
                                />
                                <div className="invalid-feedback">
                                    {feedback}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetModalData}>Cerrar</button>
                                <button type="submit" className="btn btn-success">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCategory;
