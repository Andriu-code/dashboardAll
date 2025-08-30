import PieChart from "../../Components/PieChart/PieChart"
import SimpleCard from "../../Components/SimpleCard/SimpleCard"
import './home.sass'


function Home() {
    const products = ['Computadoras', 'Laptops', 'Licencias', 'Monitores']
    const sales = [12000, 8000, 5000, 3000]
    return (
        <div>
            <h1>Resumen de Ventas</h1>
            <div className="card-container">
                <SimpleCard title="Ventas Totales" value="$25,000" />
                <SimpleCard title="Ingresos" value="$17,000" />
                <SimpleCard title="Pedidos" value="30" />
                <SimpleCard title="Visitantes" value="300" />
                <div className="graph-container">
                    <p><strong>Ventas por Producto</strong></p>
                    <PieChart products={products} sales={sales} title="Ventas de Productos" />
                </div>
            </div>
        </div>
    )
}

export default Home