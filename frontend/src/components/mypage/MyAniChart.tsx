import React, { useEffect, useState } from 'react'
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

export function MyAniChart(genresData) {
  const [myScore, setMyScore] = useState([0,0,0,0,0,0])
  const [myGenres, setMyGenres] = useState(['판타지','모험','이세계','모험','개그','시대물'])
  const [maxScore, setMaxScore] = useState(5)
  const [ticks, setTicks] = useState(1)
  const option:any = {


  startAngle: 90,
    scales: {
        r: {
            min: 0,
            max: maxScore,
            ticks:{
              display: false,
              stepSize: 1,
            },
            angleLines: {
              color: "rgba(255, 99, 132, 0.2)",
              lineWidth: 3
            },
            gridLines: {
              color: "rgba(255, 255, 255, 1)",
              circular: true,
              lineWidth: 3
            },
            pointLabels: {
              color: "rgba(255, 99, 132, 1)",
              font: {
                size: 18,
                family: 'MaplestoryOTFBold'
              }
            }

        },
        
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animations: {
      tension: {
        duration: 5000,
        easing: 'easeOutQuad',
        from: 1,
        to: 0,
        loop: true
      }
    },
  }
  const data = {
    labels: myGenres,
    datasets: [
      {
        label: '당신의 덕력',
        data: myScore,
        borderWidth: 3,
        fontSize: 40,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      
    ],
  
  }

  useEffect (() => {
    const genres = genresData.genresData
    let tempScore = [0,0,0,0,0,0];
    let tempGenres = ['판타지','모험','이세계','모험','개그','시대물'];
    let maxScore = 0
    genres.forEach(function (genre:any, index) {
      let score:any = Object.values(genre)
      let genr:any = Object.keys(genre)
      tempScore[index] = score[0]
      tempGenres[index] = genr[0]
      // 최고점수
      if (maxScore < score[0]){
        maxScore = score[0]
      }
    });
    setTicks(maxScore / 5)
    setMaxScore(maxScore)
    setMyScore(tempScore)
    setMyGenres(tempGenres)
    
  },[genresData])
  return <Radar data={data} options={option} />
}
export default MyAniChart;