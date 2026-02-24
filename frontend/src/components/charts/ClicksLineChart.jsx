import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ClicksLineChart = ({ clicksData }) => {
  const entries = Object.entries(clicksData || {}).sort(([a], [b]) => a.localeCompare(b))
  const labels = entries.map(([date]) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  )
  const values = entries.map(([, count]) => Number(count))

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-neutral-500 text-sm">No click data for this period.</p>
      </div>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Clicks',
        data: values,
        borderColor: 'oklch(55% 0.22 265)',
        backgroundColor: 'oklch(55% 0.22 265 / 0.10)',
        borderWidth: 2.5,
        pointBackgroundColor: 'oklch(55% 0.22 265)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
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
        grid: { color: 'oklch(90% 0.01 265)', drawBorder: false },
        ticks: { color: 'oklch(54% 0.009 265)', font: { size: 11 }, maxTicksLimit: 10 },
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

  return <Line data={data} options={options} />
}

export default ClicksLineChart
