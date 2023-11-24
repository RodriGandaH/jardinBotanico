import React from 'react';

const Galeria = () => {
    return (
        <div>
            <h2>Galería de Plantas</h2>
            <div className="row mt-3">
                <div className="col-md-2">
                    <label htmlFor="selectCategoria" className="form-label">Categorías</label>
                    <select id="selectCategoria" className="form-select" aria-label="selectCategoria">
                        <option value="1">Todas</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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

            
        </div >
    );
};

export default Galeria;