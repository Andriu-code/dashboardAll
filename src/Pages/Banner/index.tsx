import { useState } from 'react'
import Table from '../../Components/Table/Table';
import ModalForm from '../../Components/ModalForm/ModalForm';
import "./Banner.sass"

const banners = [
    {
        name: "Laptop Gamer",
        identifier: "Laptop con 16GB RAM, SSD 512GB",
        image: 'https://cdn.pacifiko.com/image/cache/catalog/p/N2E2MDVlYT_1-1000x1000.png',
    },
    {
        name: "Mouse Inalámbrico",
        identifier: "Mouse ergonómico y inalámbrico",
        image: 'https://cdn.pacifiko.com/image/cache/catalog/p/MzQ3OGVjN2-250x250.png',
    },
    {
        name: "Licencia Software",
        identifier: "Licencia anual de software antivirus",
        image: 'https://cdn.pacifiko.com/image/cache/catalog/p/NTgwMDJhZG_625-250x250.png',
    }
];


const columns = [
    { key: "name", label: "Nombre" },
    { key: "identifier", label: "Identificador" },
    { key: "image", label: "Imagen" },
];

type Field = {
    name: string;
    label: string;
    type?: "text" | "number" | "select" | "textarea" | "file";
    options?: string[];
};

const productFields: Field[] = [
    { name: "name", label: "Nombre del Banner", type: "text" },
    { name: "identifier", label: "Precio", type: "text" },
    { name: "image", label: "Imagen", type: "file" },
];

function Banner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBannerSubmit = (data: Record<string, unknown>) => {
        console.log("Banner guardado:", data);
    };

    return (
        <div>
            <h3>Banners</h3>
            <button className='crearBtn' onClick={() => setIsModalOpen(true)}>+ Agregar Banner</button>
            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleBannerSubmit}
                title="Crear / Editar Banner"
                fields={productFields}
            />
            <Table
                columns={columns}
                data={banners}
                onView={(row) => console.log("Ver", row)}
                onEdit={(row) => console.log("Editar", row)}
                onDelete={(row) => console.log("Eliminar", row)}
            />
        </div>
    )
}

export default Banner