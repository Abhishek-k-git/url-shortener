import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UrlBarChart = ({ data }) => {
  const sorted = [...(data || [])].sort((a, b) =>
    String(a.clickDate).localeCompare(String(b.clickDate))
  )

  const labels = sorted.map((d) =>
    new Date(d.clickDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  )
  const values = sorted.map((d) => Number(d.count))

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: values,
        backgroundColor: 'oklch(55% 0.22 265 / 0.75)',
        hoverBackgroundColor: 'oklch(55% 0.22 265)',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'oklch(20% 0.02 265)',
        titleColor: '#fff',
        bodyColor: 'oklch(80% 0.01 265)',
        padding: 12,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} clicks`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'oklch(54% 0.009 265)', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'oklch(90% 0.01 265)', drawBorder: false },
        ticks: {
          color: 'oklch(54% 0.009 265)',
          font: { size: 11 },
          stepSize: 1,
          precision: 0,
        },
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default UrlBarChart
