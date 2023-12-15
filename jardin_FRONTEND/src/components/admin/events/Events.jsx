import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
let eventsCopy;
function Events() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/events');
        eventsCopy = [...response.data];
        setEvents(response.data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);
    const buscarEvento = (eventoBuscado, e) => {
        let eventosFiltrados = [];
        let origenFiltrado =
            e.key === 'Backspace' ? [...eventsCopy] : [...events];
        eventosFiltrados = origenFiltrado.filter((evento) => {
            let nombre = evento.name.toLowerCase();
            eventoBuscado = eventoBuscado.toLowerCase();
            return nombre.includes(eventoBuscado);
        });
        setEvents(eventosFiltrados);
    };

    return (
        <>
            <h1 className="mb-4" style={{color: "#091f14"}}>Eventos</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <CreateEvent onUpdate={fetchEvents} events={events} />
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span
                            className="input-group-text bi bi-search"
                            id="inconoBuscador"
                        ></span>
                        <input
                            id="buscadorEventos"
                            type="text"
                            className="form-control"
                            placeholder="Buscar evento..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador"
                            onKeyUp={(e) => buscarEvento(e.target.value, e)}
                        />
                    </div>
                </div>
            </div>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="card mb-3">
                        <div className="card-body pb-0">
                            <p>
                                <strong>Nombre:</strong> {event.name}
                            </p>
                            <p>
                                <strong>Descripción:</strong>{' '}
                                {event.description}
                            </p>
                        </div>
                        <div className="mx-2 mb-3 d-flex justify-content-between">
                            <div className='ms-2'>
                                <p>
                                    <strong>Fecha:</strong> {event.date}
                                </p>
                                <p className="mb-0">
                                    <strong>Hora:</strong> {event.time}
                                </p>
                            </div>
                            <div className='d-flex align-items-end'>
                                <EditEvent event={event} onUpdate={fetchEvents} events={events} />
                                <DeleteEvent event={event} onUpdate={fetchEvents} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay eventos registrados.</p>
            )}
        </>
    );
}

export default Events;
