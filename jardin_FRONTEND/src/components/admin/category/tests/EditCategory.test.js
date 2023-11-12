import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Crea una instancia de axios-mock-adapter
const mock = new AxiosMockAdapter(axios);

describe('EditCategory', () => {
    test('put request to /api/categories/:id', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const category = { id: 1, name: 'Old Category' };
        const newName = 'New Category';

        // Simula una respuesta exitosa de la API
        mock.onPut(`http://localhost:8000/api/categories/${category.id}`).reply(
            200,
            {
                name: newName,
            }
        );

        const response = await axios.put(
            `http://localhost:8000/api/categories/${category.id}`,
            { name: newName },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Comprueba que la respuesta es correcta
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ name: newName });
    });
});
