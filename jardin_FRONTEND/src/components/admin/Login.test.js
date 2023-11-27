import { render, act, waitFor } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

describe('Tests Login', () => {
    test('Autenticacion exitosa', async () => {
        let fakeData = [{token: "xss87qwe84r"}];
        await act(() => Promise.resolve(
            axios.get
                .mockResolvedValueOnce(
                    { data: fakeData }
                )));
        const { getByText } = render(<Login />);
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/login');
            expect(getByText('Logeado exitosamente')).toBeVisible();
        })
    });

    test('Autenticacion fallida', async () => {
        let fakeData = [{token: "xss87qwe84r"}];
        await act(() => Promise.resolve(
            axios.get
                .mockResolvedValueOnce(
                    { data: fakeData }
                )));
        const { getByText } = render(<Login />);
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/login');
            expect(getByText('Fallo al ingresar')).toBeVisible();
        })
    });
});