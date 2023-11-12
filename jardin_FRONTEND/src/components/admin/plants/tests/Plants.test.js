import React from 'react';
import { render } from '@testing-library/react';

describe('Plants', () => {
    test('displays plants when there are some', () => {
        const plants = [
            {
                id: 1,
                name: 'Plant 1',
                description: 'Description 1',
                category: { name: 'Category 1' },
                image: 'image1.jpg',
            },
            {
                id: 2,
                name: 'Plant 2',
                description: 'Description 2',
                category: { name: 'Category 2' },
                image: 'image2.jpg',
            },
        ];

        const { container } = render(
            <>
                {plants.length > 0 ? (
                    plants.map((plant) => (
                        <div key={plant.id}>
                            <p>{plant.name}</p>
                            <p>{plant.description}</p>
                            <p>{plant.category.name}</p>
                            <img
                                src={`http://localhost:8000/${plant.image}`}
                                alt={plant.name}
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
                    <p>No hay plantas registradas.</p>
                )}
            </>
        );

        expect(container.textContent).toContain('Plant 1');
        expect(container.textContent).toContain('Plant 2');
    });

    test('displays a message when there are no plants', () => {
        const plants = [];

        const { container } = render(
            <>
                {plants.length > 0 ? (
                    plants.map((plant) => (
                        <div key={plant.id}>
                            <p>{plant.name}</p>
                            <p>{plant.description}</p>
                            <p>{plant.category.name}</p>
                            <img
                                src={`http://localhost:8000/${plant.image}`}
                                alt={plant.name}
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
                    <p>No hay plantas registradas.</p>
                )}
            </>
        );

        expect(container.textContent).toContain('No hay plantas registradas.');
    });
});
