import axios from "axios";
import { useEffect, useState } from "react";

const Galeria = () => {

    const [categorias, setCategorias] = useState([]);
    const [plantas, setPlantas] = useState([]);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        const datos = await axios.get('http://127.0.0.1:8000/api/categories')
            .then(result => {
                return result.data
            });
        mostrarPlantas(-1, datos);
        setCategorias(datos);
    };

    const mostrarPlantas = async (idCategoria, datos) => {
        let plantas = [];
        idCategoria = parseInt(idCategoria);
        datos.map(categoria => {
            if (idCategoria === -1 || idCategoria === categoria.id) {
                categoria.plants.map(planta => {
                    plantas.push(planta);
                });
            }
        });
        setPlantas(plantas);
    }

    return (
        <div>
            <h2>Galería de Plantas</h2>
            <div className="row mt-3">
                <div className="col-md-2">
                    <label htmlFor="selectCategoria" className="form-label">Categorías</label>
                    <select id="selectCategoria"
                        className="form-select"
                        aria-label="selectCategoria"
                        onChange={e => mostrarPlantas(e.target.value, categorias)}>
                        <option value="-1">Todas</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="selectOrdenar" className="form-label">Ordenar por</label>
                    <select id='selectOrdenar' className="form-select" aria-label="selectOrdenar">
                        <option value="1">A - Z</option>
                        <option value="2">Z - A</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="buscadorPlantas" className="form-label">Buscar planta</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-search" id="inconoBuscador"></span>
                        <input
                            id='buscadorPlantas'
                            type="text"
                            className="form-control"
                            placeholder="Nombre de la planta..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador" />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {plantas.map(planta => (
                    <div key={planta.id} className="col">
                        <div className="card h-100">
                            <img
                                src={`http://127.0.0.1:8000/${planta.image}`}
                                className="card-img-top object-fit-scale border rounded"
                                alt={planta.name} height={"250"} />
                            <div className="card-body">
                                <h5 className="card-title">{planta.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Galeria;