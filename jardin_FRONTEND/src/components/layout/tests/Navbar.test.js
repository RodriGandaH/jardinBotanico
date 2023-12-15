import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { activeUrl } from '../Navbar';

describe('Navbar', () => {
    describe('Test renders sin usuario admin', () => {
        const auth = { user: false };
        test('No debe mostrarse la opcion A. Categorías en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Categorías")).not.toBeVisible();
        });

        test('No debe mostrarse la opcion A. Plantas en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Galería")).not.toBeVisible();
        });

        test('No debe mostrarse la opcion A. Eventos en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Eventos")).not.toBeVisible();
        });

        test('No debe mostrarse el botón Cerrar Sesión en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("Cerrar Sesión")).not.toBeVisible();
        });
    });

    describe('Test renders con usuario admin', () => {
        const auth = { user: true };

        test('Se debe mostrar la opcion A. Categorías en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Categorías")).toBeVisible();
        });

        test('Se debe mostrar la opcion A. Plantas en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Galería")).toBeVisible();
        });

        test('Se debe mostrar la opcion A. Eventos en el navbar', () => {
            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("A. Eventos")).toBeVisible();
        });

        test('Se debe mostrar el botón Cerrar Sesión en el navbar', () => {

            render(<Navbar isAdmin={auth.user} />);
            expect(screen.getByText("Cerrar Sesión")).toBeVisible();
        });
    });

    describe('Test opcion activa por ruta', () => {
        let auth = { user: false };
        test('Galeria activa en ruta /galeria', () => {
            render(<Navbar isAdmin={auth.user} />);
            delete window.location
            window.location = new URL("http://localhost:5173/galeria");
            expect(activeUrl("/galeria")).toBeTruthy();
        });

        test('Eventos activo en ruta /eventos', () => {
            render(<Navbar isAdmin={auth.user} />);
            delete window.location
            window.location = new URL("http://localhost:5173/eventos");
            expect(activeUrl("/eventos")).toBeTruthy();
        });

        auth = { user: true };

        test('A. Galería activo en ruta /eventos', () => {
            render(<Navbar isAdmin={auth.user} />);
            delete window.location
            window.location = new URL("http://localhost:5173/admin/categorias");
            expect(activeUrl("/admin/categorias")).toBeTruthy();
        });

        test('Eventos activo en ruta /eventos', () => {
            render(<Navbar isAdmin={auth.user} />);
            delete window.location
            window.location = new URL("http://localhost:5173/admin/galeria");
            expect(activeUrl("/admin/galeria")).toBeTruthy();
        });

        test('Eventos activo en ruta /eventos', () => {
            render(<Navbar isAdmin={auth.user} />);
            delete window.location
            window.location = new URL("http://localhost:5173/admin/eventos");
            expect(activeUrl("/admin/eventos")).toBeTruthy();
        });
    });
});