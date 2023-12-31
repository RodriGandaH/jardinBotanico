import LogoutButton from '../admin/LogoutButton';

export const activeUrl = (ruta) => {
    ruta = 'http://localhost:5173' + ruta;
    let rutaActiva = window.location.href;
    return ruta === rutaActiva;
};

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#17392b" }}>
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="/">
                    <h4>Jardín</h4>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/galeria') ? ' active' : '')
                                }
                                href="/galeria"
                            >
                                Galería
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/eventos') ? ' active' : '')
                                }
                                href="/eventos"
                            >
                                Eventos
                            </a>
                        </li>
                        <li className="nav-item border-start border-secondary" hidden={!props.isAdmin}>
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/admin/category')
                                        ? ' active'
                                        : '')
                                }
                                href="/admin/category"
                            >
                                A. Categorías
                            </a>
                        </li>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/admin/plants')
                                        ? ' active'
                                        : '')
                                }
                                href="/admin/plants"
                            >
                                A. Galería
                            </a>
                        </li>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/admin/events')
                                        ? ' active'
                                        : '')
                                }
                                href="/admin/events"
                            >
                                A. Eventos
                            </a>
                        </li>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a
                                className={
                                    'nav-link text-light' +
                                    (activeUrl('/admin/info') ? ' active' : '')
                                }
                                href="/admin/info"
                            >
                                A. Informacion
                            </a>
                        </li>
                    </ul>
                    <LogoutButton isAdmin={props.isAdmin} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
