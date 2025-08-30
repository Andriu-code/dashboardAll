import Home from "./Pages/Home";
import Pedidos from "./Pages/Pedidos";
import Productos from "./Pages/Productos";
import Banner from "./Pages/Banner";
import Layout from "./Layout";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function AppRoutes() {
    // Estado simple de autenticación (puedes reemplazarlo con Context o Redux)
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                {/* Ruta de login */}
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
                        )
                    }
                />

                {/* Rutas protegidas */}
                <Route
                    element={isLoggedIn ? <Layout /> : <Navigate to="/" replace />}
                >
                    <Route path="/home" element={<Home />} />
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/banner" element={<Banner />} />
                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
