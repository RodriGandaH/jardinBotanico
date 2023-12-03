import axios from 'axios';

function DeleteCategory({ category, onUpdate }) {

    const idModal = "modalEliminarCategoria" + category.id;
    const idLabel = "modalEliminarCategoriaLabel" + category.id;

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/categories/${category.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            $('#' + idModal).modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar la categoría:', error);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#" + idModal}>
                Eliminar
            </button>

            <div className="modal fade" id={idModal} tabIndex="-1" aria-labelledby={idLabel} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={idLabel}>Editar categoría</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro de que quieres eliminar la categoría "{category.name}"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Sí, eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteCategory;
