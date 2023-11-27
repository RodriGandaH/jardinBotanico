import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

describe('Footer', () => {

    describe('Carga de RRSS', () => {

        afterEach(() => {
            mock.reset();
        });

        test('Carga fb', () => {
            let fakeData = { facebook: 'https://www.google.com/', x: "", tiktok: "", instagram: "" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let tag = element.getElementsByTagName("i")[0];
            tag.getAttribute("href");
            expect(element.getElementsByTagName("i").length === 1 && tag.getAttribute("href") === fakeData.facebook).toBeTruthy();
        });

        test('Carga de x', () => {
            let fakeData = { facebook: '', x: "https://www.google.com/", tiktok: "", instagram: "" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let tag = element.getElementsByTagName("i")[0];
            tag.getAttribute("href");
            expect(element.getElementsByTagName("i").length === 1 && tag.getAttribute("href") === fakeData.x).toBeTruthy();
        });

        test('Carga de tiktok', () => {
            let fakeData = { facebook: '', x: "", tiktok: "https://www.google.com/", instagram: "" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let tag = element.getElementsByTagName("i")[0];
            tag.getAttribute("href");
            expect(element.getElementsByTagName("i").length === 1 && tag.getAttribute("href") === fakeData.tiktok).toBeTruthy();
        });

        test('Carga de instagram', () => {
            let fakeData = { facebook: '', x: "", tiktok: "", instagram: "https://www.google.com/" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let tag = element.getElementsByTagName("i")[0];
            tag.getAttribute("href");
            expect(element.getElementsByTagName("i").length === 1 && tag.getAttribute("href") === fakeData.instagram).toBeTruthy();
        });

        test('Carga de todas las RRSS', () => {
            let fakeData = { facebook: 'https://www.google.com/', x: "https://www.google.com/", tiktok: "https://www.google.com/", instagram: "https://www.google.com/" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let nroRRSS = element.getElementsByTagName("i");
            expect(nroRRSS.length).toBe(4);
        });

        test('Carga de niguna', () => {
            let fakeData = { facebook: "", x: "", tiktok: "", instagram: "" };
            mock.onGet("/users").reply(function (config) {
                return [200, fakeData,];
            });
            const { container } = render(<Footer />);
            let element = container.getElementsByTagName("section")[1];
            let nroRRSS = element.getElementsByTagName("i");
            expect(nroRRSS.length).toBe(0);
        });

    });
});