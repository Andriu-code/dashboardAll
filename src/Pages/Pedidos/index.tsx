import React, { useState } from 'react'
import Table from '../../Components/Table/Table';
import "./../Productos/productos.sass"
import ModalForm from '../../Components/ModalForm/ModalForm';

const orders = [
    { customer: "Juan", date: "2025-08-23", total: "$150", status: "Pendiente" },
    { customer: "Ana", date: "2025-08-22", total: "$300", status: "Completado" },
];

const orderColumns = [
    { key: "customer", label: "Cliente" },
    { key: "date", label: "Fecha" },
    { key: "total", label: "Total" },
    { key: "status", label: "Estado" },
];

const orderFields = [
    { name: "customerName", label: "Nombre del cliente", type: "text" },
    { name: "product", label: "Producto", type: "select", options: ["Café", "Té", "Pastelito"] },
    { name: "quantity", label: "Cantidad", type: "number" },
    { name: "status", label: "Estado", type: "select", options: ["Pendiente", "Enviado", "Entregado"] },
    { name: "notes", label: "Notas", type: "textarea" },
];

function Pedidos() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderSubmit = (data: Record<string, any>) => {
        console.log("Pedido guardado:", data);
    };
    return (
        <>
            <h3>Pedidos</h3>
            <button className='crearBtn' onClick={() => setIsModalOpen(true)}>+ Agregar Pedido</button>
            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleOrderSubmit}
                title="Crear / Editar Pedido"
                fields={orderFields}
            />
            <Table
                columns={orderColumns}
                data={orders}
                onView={(row) => console.log("Ver pedido", row)}
                onEdit={(row) => console.log("Editar pedido", row)}
                onDelete={(row) => console.log("Eliminar pedido", row)}
            />
        </>
    )
}

export default Pedidos