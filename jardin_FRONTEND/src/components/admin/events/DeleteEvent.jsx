import axios from 'axios';

function DeleteEvent({ event: evento, onUpdate }) {
    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/events/${evento.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Evento eliminado');
            $(`#deleteEventModal-${evento.id}`).modal('hide');
            onUpdate();
        } catch (error) {
            console.log('Error al eliminar el evento:', error);
        }
    };

    return (
        <div>
            <button
                data-bs-toggle="modal"
                data-bs-target={`#deleteEventModal-${evento.id}`}
                className="btn btn-danger mx-1"
            >
                Eliminar
            </button>
            <div
                className="modal fade"
                id={`deleteEventModal-${evento.id}`}
                tabIndex="-1"
                aria-labelledby="deleteEventModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="deleteEventModalLabel"
                            >
                                Eliminar evento
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                ¿Estás seguro de que quieres eliminar este
                                evento?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                No, cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteEvent;
