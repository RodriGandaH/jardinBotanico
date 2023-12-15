import { render, act, waitFor } from '@testing-library/react';
import Eventos from './Eventos';
import axios from 'axios';

jest.mock('axios');

describe('Tests eventos', () => {

    describe('Carga de eventos', () => {

        test('Render 3 eventos', async () => {
            let fakeData = [
                { id: 1, images: [{ image: "" }], name: "Evento1", date: "2023/12/15", time: "14:00", description: "Desc1" },
                { id: 2, images: [{ image: "" }], name: "Evento2", date: "2023/12/16", time: "15:00", description: "Desc2" },
                { id: 3, images: [{ image: "" }], name: "Evento3", date: "2023/12/17", time: "16:00", description: "Desc3" },
            ];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { getByText } = render(<Eventos />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/events');
                expect(getByText('Evento1')).toBeVisible();
                expect(getByText('Evento2')).toBeVisible();
                expect(getByText('Evento3')).toBeVisible();
            })
        });

        test('Carga de ningun evento', async () => {
            let fakeData = [];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { getByText } = render(<Eventos />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/events');
                expect(getByText('No se encontró ningún evento.')).toBeVisible();
            })
        });
    });
});