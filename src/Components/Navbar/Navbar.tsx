import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "./../../assets/img/logo.jpeg"
import "./Navbar.sass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            {/* Barra de búsqueda (desktop) */}
            <div className="searchDesktop">
                <input type="text" placeholder="Buscar..." />
            </div>

            {/* Perfil + logout (desktop) */}
            <div className="userDesktop">
                <div className="userInfo">
                    <label>Hola, Usuario</label>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                </div>
                <button className="logoutBtn" aria-label="Cerrar sesión">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                </button>
            </div>

            {/* Botón menú móvil */}
            <button
                className="menuBtn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Menú móvil */}
            {menuOpen && (
                <div className="mobileMenu">
                    <input type="text" placeholder="Buscar..." />
                    <div className="userInfo">
                        <label>Hola, Usuario</label>
                        <FontAwesomeIcon icon={faUser} size="xl" />
                    </div>
                    <button className="logoutBtn" aria-label="Cerrar sesión">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

