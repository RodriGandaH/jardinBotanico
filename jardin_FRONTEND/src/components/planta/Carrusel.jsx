import './Carrusel.css';

const Carrusel = ({ imagenes, height, heightCont, width }) => {

    const idPrimeraImagen = imagenes[0].id;
    let nroSlide = 0;
    const idCarrusel = "carruselEvento" + imagenes[0].id;

    return (
        <>
            <div id={idCarrusel} className="carousel slide" style={{maxWidth: width}}>
                <div className="carousel-indicators">
                    {imagenes.map(imagen => {
                        return (
                            <button
                                type="button"
                                data-bs-target={"#" + idCarrusel}
                                data-bs-slide-to={nroSlide++}
                                className={imagen.id === idPrimeraImagen ? "active" : ""}
                                aria-current={imagen.id === idPrimeraImagen ? "true" : "false"}
                                aria-label={"Slide " + nroSlide}
                                key={imagen.id}>
                            </button>
                        );
                    })}
                </div>
                <div className="carousel-inner" style={{maxWidth: width}}>
                    {imagenes.map(imagen => (
                        <div
                            className={"carousel-item " + (imagen.id === idPrimeraImagen ? "active" : "")}
                            key={imagen.id}
                        >
                            <div className="d-flex align-items-center justify-content-center" style={{ height: heightCont, width: width}}>
                                <img
                                    src={imagen.local ? imagen.image :`http://127.0.0.1:8000/${imagen.image}`}
                                    className="d-block rounded"
                                    style={{ maxHeight: height, maxWidth: width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={"#" + idCarrusel} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={"#" + idCarrusel} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>
        </>
    );
};

export default Carrusel;