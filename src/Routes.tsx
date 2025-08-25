
import Home from "./Pages/Home"
import Pedidos from "./Pages/Pedidos"
import Productos from "./Pages/Productos"
import Banner from "./Pages/Banner"
import Layout from "./Layout"
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';

function AppRoutes() {
    return (
        <Router>
            <RouterRoutes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/banner" element={<Banner />} />
                </Route>
                {/* Ruta por defecto si no encuentra ninguna */}
                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </RouterRoutes>
        </Router>
    )
}

export default AppRoutes