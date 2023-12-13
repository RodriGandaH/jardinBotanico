import { render, act, waitFor } from '@testing-library/react';
import Footer from '../Footer';
import axios from 'axios';

jest.mock('axios');

describe('Footer', () => {

    describe('Carga de RRSS', () => {

        test('Carga de todas las RRSS', async () => {
            let fakeData = [
                { id: 1, name: "Facebook", data: "https://www.facebook.com/profile.php?id=100078017859101" },
                { id: 2, name: "Twitter", data: "https://www.facebook.com/profile.php?id=100078017859101" },
                { id: 3, name: "Instagram", data: "https://www.facebook.com/profile.php?id=100078017859101" },
            ];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Footer />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/networks');
                let element = container.getElementsByTagName("section")[1];
                let nroRRSS = element.getElementsByTagName("i");
                expect(nroRRSS.length).toBe(3);
            })
        });

        test('Carga de ninguna RRSS', async () => {
            let fakeData = [];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Footer />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/networks');
                let element = container.getElementsByTagName("section")[1];
                let nroRRSS = element.getElementsByTagName("i");
                expect(nroRRSS.length).toBe(0);
            })
        });

        test('Carga de info contacto', async () => {
            let fakeData = [
                { id: 1, name: "Email", data: "correo@gmail.com" },
                { id: 2, name: "Telefono", data: "12345678" },
            ];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Footer />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/networks');
                let element = container.getElementsByTagName("section")[0];
                let nroRRSS = element.getElementsByTagName("i");
                expect(nroRRSS.length).toBe(3);
            })
        });

        test('Carga de ninguna RRSS', async () => {
            let fakeData = [];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Footer />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/networks');
                let element = container.getElementsByTagName("section")[0];
                let nroRRSS = element.getElementsByTagName("i");
                expect(nroRRSS.length).toBe(1);
            })
        });

    });
});