import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('EditEvent', () => {
    test('put request to /api/events/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const event = {
            id: 1,
            name: 'Old Event',
            description: 'Old Description',
            date: '2023-01-01',
            image: 'oldImage.jpg',
        };
        const newEvent = {
            name: 'New Event',
            description: 'New Description',
            date: '2023-02-02',
            image: 'newImage.jpg',
        };

        // Simula una respuesta exitosa de la API
        mock.onPost(`http://localhost:8000/api/events/${event.id}`).reply(
            200,
            newEvent
        );

        const formData = new FormData();
        formData.append('name', newEvent.name);
        formData.append('date', newEvent.date);
        formData.append('description', newEvent.description);
        formData.append('image', newEvent.image);

        const response = await axios.post(
            `http://localhost:8000/api/events/${event.id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
        expect(response.data).toEqual(newEvent);
    });
});
