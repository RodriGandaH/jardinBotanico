import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('DeletePlant', () => {
    test('delete request to /api/plants/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const plant = {
            id: 1,
            name: 'Old Plant',
            description: 'Old Description',
            category_id: 1,
            image: 'oldImage.jpg',
        };

        // Simula una respuesta exitosa de la API
        mock.onDelete(`http://localhost:8000/api/plants/${plant.id}`).reply(
            200,
            {}
        );

        const response = await axios.delete(
            `http://localhost:8000/api/plants/${plant.id}`,
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
