import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export const data = {
  labels: ['판타지', '로맨스', '금동운', '이소영', '안세영', '장창완'],
  datasets: [
    {
      label: '당신의 덕력',
      data: [5, 5, 5, 5, 5, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 3,

    },
    
  ],

}

export const option:any = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 0,
            suggestedMax: 10
        }
    },
    plugins: {
      legend: {
        display: false
      }
    }
    
}
export default function App() {
  return <Radar data={data} options={option} />
}
