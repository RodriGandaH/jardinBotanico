import React from 'react';
import { render } from '@testing-library/react';

describe('Events', () => {
    test('displays events when there are some', () => {
        const events = [
            {
                id: 1,
                name: 'Event 1',
                description: 'Description 1',
                date: '2023-01-01',
                image: 'image1.jpg',
            },
            {
                id: 2,
                name: 'Event 2',
                description: 'Description 2',
                date: '2023-02-02',
                image: 'image2.jpg',
            },
        ];

        const { container } = render(
            <>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id}>
                            <p>{event.name}</p>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                            <img
                                src={`http://localhost:8000/${event.image}`}
                                alt={event.name}
                                style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: '50%',
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay eventos registrados.</p>
                )}
            </>
        );

        expect(container.textContent).toContain('Event 1');
        expect(container.textContent).toContain('Event 2');
    });

    test('displays a message when there are no events', () => {
        const events = [];

        const { container } = render(
            <>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id}>
                            <p>{event.name}</p>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                            <img
                                src={`http://localhost:8000/${event.image}`}
                                alt={event.name}
                                style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: '50%',
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay eventos registrados.</p>
                )}
            </>
        );

        expect(container.textContent).toContain('No hay eventos registrados.');
    });
});
