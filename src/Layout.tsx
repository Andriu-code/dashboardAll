import './layout.sass';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className='layout-container'>
            {/* Navbar fijo */}
            <header>
                <Navbar />
            </header>

            {/* Contenido principal */}
            <main>
                {/* Sidebar */}
                <Sidebar />

                {/* Contenido de las rutas */}
                <div className='content'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
