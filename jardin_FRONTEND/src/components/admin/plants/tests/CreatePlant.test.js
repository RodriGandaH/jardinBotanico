import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('CreatePlant', () => {
    test('post request to /api/plants', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        // Simula una respuesta exitosa de la API
        const newPlant = {
            name: 'New Plant',
            description: 'New Description',
            category_id: 1,
            image: 'newImage.jpg',
        };
        mock.onPost('http://localhost:8000/api/plants').reply(200, newPlant);

        const formData = new FormData();
        formData.append('name', newPlant.name);
        formData.append('description', newPlant.description);
        formData.append('category_id', newPlant.category_id);
        formData.append('image', newPlant.image);

        const response = await axios.post(
            'http://localhost:8000/api/plants',
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
