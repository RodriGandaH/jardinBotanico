import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('DeleteEvent', () => {
    test('delete request to /api/events/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const event = {
            id: 1,
            name: 'Old Event',
            description: 'Old Description',
            date: '2023-01-01',
            image: 'oldImage.jpg',
        };

        // Simula una respuesta exitosa de la API
        mock.onDelete(`http://localhost:8000/api/events/${event.id}`).reply(
            200,
            {}
        );

        const response = await axios.delete(
            `http://localhost:8000/api/events/${event.id}`,
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
