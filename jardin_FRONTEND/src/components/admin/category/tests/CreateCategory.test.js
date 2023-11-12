import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('API', () => {
    test('post request to /api/categories', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        // Simula una respuesta exitosa de la API
        mock.onPost('http://localhost:8000/api/categories').reply(200, {
            name: 'New Category',
        });

        const response = await axios.post(
            'http://localhost:8000/api/categories',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ name: 'New Category' });
    });
});
