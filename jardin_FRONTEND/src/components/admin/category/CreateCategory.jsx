import { useState } from 'react';
import axios from 'axios';

$('#modalCrearCategoria').on('hidden.bs.modal', function (e) {
    document.getElementById("nombreCategoria").value = "";
});

function CreateCategory({ onUpdate }) {

    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

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
        } catch (error) {
            console.log('Error al crear la categoría:', error);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearCategoria">
                Registrar categoría
            </button>

            <div className="modal fade" id="modalCrearCategoria" tabIndex="-1" aria-labelledby="modalCrearCategoriaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalCrearCategoriaLabel">Crear categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label htmlFor="nombreCategoria" className="form-label">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreCategoria"
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

export default CreateCategory;
