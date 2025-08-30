import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Definir interfaz de props
interface SalesPieChartProps {
    products: string[]
    sales: number[]
    title?: string
}

const PieChart: React.FC<SalesPieChartProps> = ({ products, sales, title }) => {
    const chartData = {
        labels: products,
        datasets: [
            {
                label: 'Ventas por Producto',
                data: sales,
                backgroundColor: [
                    '#957DAD', // morado principal
                    '#CABFDE',
                    '#6C5B7B',
                    '#D8BFD8',
                    '#E6E6FA'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 18
                }
            }
        }
    }

    return <Pie data={chartData} options={options} />
}

export default PieChart
