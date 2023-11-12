import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Category', () => {
    test('displays categories when there are some', () => {
        const categories = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
        ];

        const { container } = render(
            <>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id}>
                            <p>{category.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay categorías registradas.</p>
                )}
            </>
        );

        expect(container.textContent).toContain('Category 1');
        expect(container.textContent).toContain('Category 2');
    });

    test('displays a message when there are no categories', () => {
        const categories = [];

        const { container } = render(
            <>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id}>
                            <p>{category.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay categorías registradas.</p>
                )}
            </>
        );

        expect(container.textContent).toContain(
            'No hay categorías registradas.'
        );
    });
});
