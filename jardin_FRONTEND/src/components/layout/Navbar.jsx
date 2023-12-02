import LogoutButton from "../admin/LogoutButton";

export const activeUrl = (ruta) => {
    ruta = "http://localhost:5173" + ruta;
    let rutaActiva = window.location.href;
    return ruta === rutaActiva;
};

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-success-subtle">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Jardín</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <a
                                className={("nav-link" + (activeUrl("/galeria") ? " active" : ""))}
                                href="/galeria">
                                Galería
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={"nav-link" + (activeUrl("/eventos") ? " active" : "")}
                                href="/eventos">
                                Eventos
                            </a>
                        </li>
                        <div className="vr" hidden={!props.isAdmin}></div>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a className="nav-link" href="/admin/category">A. Categorías</a>
                        </li>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a className="nav-link" href="/admin/plants">A. Galería</a>
                        </li>
                        <li className="nav-item" hidden={!props.isAdmin}>
                            <a className="nav-link" href="/admin/events">A. Eventos</a>
                        </li>
                    </ul>
                    <LogoutButton isAdmin={props.isAdmin} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;