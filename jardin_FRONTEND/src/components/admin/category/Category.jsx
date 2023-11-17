import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

function Category() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/categories'
        );
        setCategories(response.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <h1>Categoría</h1>

            <CreateCategory onUpdate={fetchCategories} />
            {categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.id}>
                        <p>{category.name}</p>
                        <EditCategory
                            category={category}
                            onUpdate={fetchCategories}
                        />
                        <DeleteCategory
                            category={category}
                            onUpdate={fetchCategories}
                        />
                    </div>
                ))
            ) : (
                <p>No hay categorías registradas.</p>
            )}
        </>
    );
}

export default Category;
