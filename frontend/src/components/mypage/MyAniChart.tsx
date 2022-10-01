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
  const option:any = {
      scales: {
          r: {
              angleLines: {
                  display: false
              },
              suggestedMin: 0,
              suggestedMax: maxScore+1,
              ticks:{
                stepSize: 1
              }
          }
      },
      plugins: {
        legend: {
          display: false
        }
      }
      
  }
  const data = {
    labels: myGenres,
    datasets: [
      {
        label: '당신의 덕력',
        data: myScore,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
  
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
    setMaxScore(maxScore)
    setMyScore(tempScore)
    setMyGenres(tempGenres)
    
  },[genresData])
  return <Radar data={data} options={option} />
}
export default MyAniChart;