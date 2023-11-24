import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('EditPlant', () => {
    test('put request to /api/plants/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const plant = {
            id: 1,
            name: 'Old Plant',
            description: 'Old Description',
            category_id: 1,
            image: 'oldImage.jpg',
        };
        const newPlant = {
            name: 'New Plant',
            description: 'New Description',
            category_id: 2,
            image: 'newImage.jpg',
        };

        // Simula una respuesta exitosa de la API
        mock.onPost(`http://localhost:8000/api/plants/${plant.id}`).reply(
            200,
            newPlant
        );

        const formData = new FormData();
        formData.append('name', newPlant.name);
        formData.append('description', newPlant.description);
        formData.append('category_id', newPlant.category_id);
        formData.append('image', newPlant.image);

        const response = await axios.post(
            `http://localhost:8000/api/plants/${plant.id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
        expect(response.data).toEqual(newPlant);
    });
});
