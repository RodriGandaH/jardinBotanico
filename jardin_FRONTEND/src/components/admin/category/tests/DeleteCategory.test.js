import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('DeleteCategory', () => {
    test('delete request to /api/categories/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const category = { id: 1, name: 'Old Category' };

        // Simula una respuesta exitosa de la API
        mock.onDelete(
            `http://localhost:8000/api/categories/${category.id}`
        ).reply(200, {});

        const response = await axios.delete(
            `http://localhost:8000/api/categories/${category.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
    });
});
