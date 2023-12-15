import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

let categoriesCopy;

function Category() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/categories'
        );
        categoriesCopy = [...response.data];
        setCategories(response.data);
    };

    const buscarCategoria = (categoriaBuscada, e) => {
        let categoriasFiltradas = [];
        let origenFiltrado = e.key === "Backspace" ? [...categoriesCopy] : [...categories];
        categoriasFiltradas = origenFiltrado.filter(categoria => {
            let nombre = categoria.name.toLowerCase();
            categoriaBuscada = categoriaBuscada.toLowerCase();
            return nombre.includes(categoriaBuscada);
        });
        setCategories(categoriasFiltradas);
    };

    return (
        <>
            <h2 style={{color: "#091f14"}}>Categorías</h2>
            <div className="row mt-4">
                <div className="col-md-6">
                    <CreateCategory onUpdate={fetchCategories} categories={categories} />
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-search" id="inconoBuscador"></span>
                        <input
                            id='buscadorPlantas'
                            type="text"
                            className="form-control"
                            placeholder="Buscar categoría..."
                            aria-label="Buscador"
                            aria-describedby="inconoBuscador"
                            onKeyUp={e => buscarCategoria(e.target.value, e)} />
                    </div>
                </div>
            </div>
            {categories.length > 0 ? (
                categories.map((category) => (
                    <div className="row border rounded mb-3" key={category.id}>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <p><b>Nombre:</b> {category.name}</p>
                            <div className='d-flex col-md-6 justify-content-end'>
                                <div className="mx-2">
                                    <EditCategory
                                        category={category}
                                        onUpdate={fetchCategories}
                                        categories={categories}
                                    />
                                </div>
                                <div className="mx-2">
                                    <DeleteCategory
                                        category={category}
                                        onUpdate={fetchCategories}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay categorías registradas.</p>
            )}
        </>
    );
}

export default Category;
