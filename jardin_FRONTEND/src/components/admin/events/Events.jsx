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
            <h1>Eventos</h1>

            <CreateEvent onUpdate={handleUpdate} />
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id}>
                        <p>{event.name}</p>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <img
                            src={`http://127.0.0.1:8000/${event.image}`}
                            alt={event.name}
                            style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '50%',
                            }}
                        />
                        <EditEvent event={event} onUpdate={handleUpdate} />
                        <DeleteEvent event={event} onUpdate={handleUpdate} />
                    </div>
                ))
            ) : (
                <p>No hay eventos registrados.</p>
            )}
        </>
    );
}
export default Events;
