import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Carrusel from "./Carrusel";

let eventosCopia;

const Eventos = () => {

    const [eventos, setEventos] = useState([]);
    let flexDirection = "flex-row-reverse";

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        const eventos = await axios.get('http://127.0.0.1:8000/api/events')
            .then(result => {
                return result.data
            });
        eventosCopia = [...eventos];
        setEventos(eventos);
    };

    const getFlexDirection = () => {
        flexDirection = flexDirection === "flex-row" ? "flex-row-reverse" : "flex-row";
        return flexDirection;
    }

    const getBorder = () => {
        let border = flexDirection === "flex-row" ? "border-start" : "border-end";
        return border;
    };

    const buscarEvento = (eventoBuscado, e) => {
        let eventosFiltrados = [];
        let origenFiltrado = e.key === "Backspace" ? [...eventosCopia] : [...eventos];
        eventosFiltrados = origenFiltrado.filter(evento => {
            let nombre = evento.name.toLowerCase();
            eventoBuscado = eventoBuscado.toLowerCase();
            return nombre.includes(eventoBuscado);
        });
        setEventos(eventosFiltrados);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <h2 style={{color: "#091f14"}}>Eventos</h2>
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-search" id="inconoBuscador"></span>
                        <input
                            id='buscadorPlantas'
                            type="text"
                            className="form-control"
                            placeholder="Buscar evento..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador"
                            onKeyUp={e => buscarEvento(e.target.value, e)} />
                    </div>
                </div>
            </div>
            {eventos.map(evento => (
                <div className="col-md-12 border rounded mb-4" key={evento.id}>
                    <div className={"d-flex my-3 " + getFlexDirection()}>
                        <div className="d-flex col-md-4 col-sm-12 justify-content-center align-items-center">
                            <Carrusel imagenes={evento.images} />
                        </div>
                        <div className={"col-md-8 col-sm-12 " + getBorder()}>
                            <div className={"mt-2 mx-3"}>
                                <h4>{evento.name}</h4>
                                <h5>Se llevara a cabo el {dayjs(evento.date).format("DD-MM-YYYY")} a horas {evento.time.substring(0, 5)} </h5>
                                <div style={{ whiteSpace: "pre-wrap" }}>{evento.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

};

export default Eventos;