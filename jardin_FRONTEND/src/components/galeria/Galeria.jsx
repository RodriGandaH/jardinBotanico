import axios from "axios";
import { useEffect, useState } from "react";

let plantasCopia = [];

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

    const mostrarPlantas = (idCategoria, datos) => {
        let plantas = [];
        idCategoria = parseInt(idCategoria);
        datos.map(categoria => {
            if (idCategoria === -1 || idCategoria === categoria.id) {
                categoria.plants.map(planta => {
                    planta =
                    {
                        id: planta.id,
                        name: planta.name,
                        scientific_name: planta.scientific_name,
                        description: planta.description,
                        images: planta.images,
                        category: categoria.name
                    };
                    plantas.push(planta);
                });
            }
        });
        plantas = getPlantasOrdenadas(1, plantas);
        plantasCopia = plantas;
        console.log(plantas);
        setPlantas(plantas);
    }

    const ordenarPlantas = (ordenamiento, datos) => {
        let plantasOrdenadas = getPlantasOrdenadas(ordenamiento, datos);
        plantasCopia = plantasOrdenadas;
        setPlantas(plantasOrdenadas);
    };

    const getPlantasOrdenadas = (ordenamiento, datos) => {
        let plantas = [...datos];
        ordenamiento = parseInt(ordenamiento);
        if (ordenamiento === 1) {
            plantas.sort(compararNombresAsc);
        } else {
            plantas.sort(compararNombresDesc);
        }
        return plantas;
    }

    const compararNombresAsc = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    const compararNombresDesc = (a, b) => {
        if (a.name < b.name) {
            return 1;
        }
        if (a.name > b.name) {
            return -1;
        }
        return 0;
    };

    const buscarPlanta = (plantaBuscada, e) => {
        let plantasFiltradas = [];
        let origenFiltrado = e.key === "Backspace" ? [...plantasCopia] : [...plantas];
        plantasFiltradas = origenFiltrado.filter(planta => {
            let nombre = planta.name.toLowerCase();
            plantaBuscada = plantaBuscada.toLowerCase();
            return nombre.includes(plantaBuscada);
        });
        setPlantas(plantasFiltradas);
    };

    return (
        <div>
            <h2 style={{color: "#091f14"}}>Galería de Plantas</h2>
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="row g-3">
                        <div className="col-4">
                            <label htmlFor="selectCategoria" className="form-label">Categorías</label>
                        </div>
                        <div className="col-8">
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
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="row g-3">
                        <div className="col-4">
                            <label htmlFor="selectOrdenar" className="form-label">Ordenar por</label>
                        </div>
                        <div className="col-8">
                            <select id='selectOrdenar'
                                className="form-select"
                                aria-label="selectOrdenar"
                                onChange={e => ordenarPlantas(e.target.value, plantas)}>
                                <option value="1">A - Z</option>
                                <option value="2">Z - A</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-search" id="inconoBuscador"></span>
                        <input
                            id='buscadorPlantas'
                            type="text"
                            className="form-control"
                            placeholder="Nombre de la planta..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador"
                            onKeyUp={e => buscarPlanta(e.target.value, e)} />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {plantas.map(planta => (
                    <div key={planta.id} className="col">
                        <div className="tarjeta card h-100">
                            <a id="enlacePlanta" href={"/planta/" + planta.id} style={{ textDecoration: "none" }}>
                                <img
                                    src={`http://127.0.0.1:8000/${planta.images[0].image}`}
                                    className="p-1 card-img-top object-fit-scale rounded"
                                    alt={planta.name} height={"250"} />
                                <div className="card-body text-dark border-top" style={{whiteSpace: "pre"}}>
                                    <h5><b>Nombre:</b>  {planta.name}</h5>
                                    <h6><b>Categoria:</b>    {planta.category}</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Galeria;