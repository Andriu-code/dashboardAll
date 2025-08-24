import React, { useState } from 'react'
import Table from '../../Components/Table/Table';
import ModalForm from '../../Components/ModalForm/ModalForm';
import "./productos.sass"

const products = [
    { name: "Laptop", price: "$1200", specs: "16GB RAM, 512GB SSD" },
    { name: "Mouse", price: "$25", specs: "Wireless, Ergonomic" },
];

const columns = [
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio" },
    { key: "specs", label: "Especificaciones" },
];

const productFields = [
    { name: "name", label: "Nombre del producto", type: "text" },
    { name: "price", label: "Precio", type: "number" },
    { name: "category", label: "Categoría", type: "select", options: ["Bebida", "Snack", "Accesorio"] },
    { name: "description", label: "Descripción", type: "textarea" },
];

function Productos() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductSubmit = (data: Record<string, any>) => {
        console.log("Producto guardado:", data);
    };

    return (
        <div>
            <h3>Productos</h3>
            <button className='crearBtn' onClick={() => setIsModalOpen(true)}>+ Agregar Producto</button>
            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleProductSubmit}
                title="Crear / Editar Producto"
                fields={productFields}
            />
            <Table
                columns={columns}
                data={products}
                onView={(row) => console.log("Ver", row)}
                onEdit={(row) => console.log("Editar", row)}
                onDelete={(row) => console.log("Eliminar", row)}
            />
        </div>
    )
}

export default Productos