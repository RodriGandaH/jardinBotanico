import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCategory({ category, onUpdate }) {

    const [name, setName] = useState(category.name);
    const idModal = "modalEditarCategoria" + category.id;
    const idLabel = "modalEditarCategoriaLabel" + category.id;
    const idInput = "nombreCategoria" + category.id;

    useEffect(() => {
        setName(category.name);
    }, [category]);

    const handleEdit = async (event) => {
        event.preventDefault();

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
        } catch (error) {
            console.log('Error al editar la categoría:', error);
        }
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
