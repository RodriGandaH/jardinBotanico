import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('API', () => {
    test('post request to /api/events', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        // Simula una respuesta exitosa de la API
        mock.onPost('http://localhost:8000/api/events').reply(200, {
            name: 'New Event',
            description: 'Description',
            date: '2023-01-01',
            image: 'image.jpg',
        });

        const response = await axios.post(
            'http://localhost:8000/api/events',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: 'New Event',
            description: 'Description',
            date: '2023-01-01',
            image: 'image.jpg',
        });
    });
});
