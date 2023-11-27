import { render, act, waitFor } from '@testing-library/react';
import Galeria from './Galeria';
import axios from 'axios';

jest.mock('axios');

describe('Tests galeria', () => {

    describe('Carga de categorias en el selector', () => {
        test('Render 3 categorias', async () => {
            let fakeData = [
                { id: 1, name: "Arboles", plants: [] },
                { id: 2, name: "Arbustos", plants: [] },
                { id: 3, name: "Flores", plants: [] }];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { getByText } = render(<Galeria />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/categories');
                expect(getByText('Arboles')).toBeVisible();
                expect(getByText('Arbustos')).toBeVisible();
                expect(getByText('Flores')).toBeVisible();
            })
        });

        test('Carga 0 categorias', async () => {
            let fakeData = [];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Galeria />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/categories');
                let select = container.getElementsByTagName("select")[0];
                expect(select.getElementsByTagName("option").length).toBe(1);
            })
        });
    });

    describe('Carga de plantas', () => {

        test('Render 4 plantas', async () => {
            let fakeData = [
                {
                    id: 1, name: "Arboles", plants: [
                        { id: 1, image: "", name: "Palta" },
                        { id: 2, image: "", name: "Limon" }]
                },
                {
                    id: 2, name: "Arbustos", plants: [
                        { id: 3, image: "", name: "Arbusto1" },
                        { id: 4, image: "", name: "Arbusto2" }]
                }];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { getByText } = render(<Galeria />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/categories');
                expect(getByText('Palta')).toBeVisible();
                expect(getByText('Limon')).toBeVisible();
                expect(getByText('Arbusto1')).toBeVisible();
                expect(getByText('Arbusto2')).toBeVisible();
            })
        });

        test('Carga 0 plantas', async () => {
            let fakeData = [
                {
                    id: 1, name: "Arboles", plants: []
                },
                {
                    id: 2, name: "Arbustos", plants: []
                }];
            await act(() => Promise.resolve(
                axios.get
                    .mockResolvedValueOnce(
                        { data: fakeData }
                    )));
            const { container } = render(<Galeria />);
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/categories');
                let cards = container.getElementsByClassName("card");
                expect(cards.length).toBe(0);
            })
        });
    });
});