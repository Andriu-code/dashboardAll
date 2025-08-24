import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBox,
    faDolly,
    faLaptop,
    faBars,
    faX
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "./Sidebar.sass"


const menuItems = [
    {
        title: "Inicio",
        icon: "faHome",
        path: "/"
    },
    {
        title: "Productos",
        icon: "faUser",
        path: "/productos"
    },
    {
        title: "Pedidos",
        icon: "faCog",
        path: "/pedidos"
    },
    {
        title: "Banner",
        icon: "faChartLine",
        path: "/banner"
    }
];

// Mapeo de string a iconos reales
const iconMap: Record<string, IconDefinition> = {
    faHome: faHome,
    faUser: faBox,
    faCog: faDolly,
    faChartLine: faLaptop
};

// ----------------------------
// Componente Sidebar
// ----------------------------
const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Botón colapsable en móvil */}
            <button
                className="mobileToggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
                <FontAwesomeIcon icon={isOpen ? faX : faBars} />
            </button>

            <aside className={`${"sidebar"} ${isOpen ? "open" : "closed"}`}>
                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.title}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    <FontAwesomeIcon icon={iconMap[item.icon]} />
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
