import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';

function Events() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/events');
        setEvents(response.data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleUpdate = () => {
        fetchEvents();
    };

    return (
        <>
            <h1 className="mb-4">Eventos</h1>

            <CreateEvent onUpdate={handleUpdate} />
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="card mb-3">
                        <div className="card-body">
                            <p>
                                <strong>Nombre:</strong> {event.name}
                            </p>
                            <p>
                                <strong>Descripción:</strong>{' '}
                                {event.description}
                            </p>
                            <p>
                                <strong>Fecha:</strong> {event.date}
                            </p>
                            <p className="mb-0">
                                <strong>Hora:</strong> {event.time}
                            </p>
                        </div>
                        <div className="m-2 d-flex justify-content-end">
                            <EditEvent event={event} onUpdate={handleUpdate} />
                            <DeleteEvent
                                event={event}
                                onUpdate={handleUpdate}
                            />
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
