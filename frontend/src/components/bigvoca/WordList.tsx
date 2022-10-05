import React, {useEffect, useState} from 'react'

// MUI
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'

// image
import BackgroundImg from  '../../assets/images/wordBackgroundImg.png'

// redux
import { getVocaList } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'

// 하위 컴포넌트
import WordItem from './WordItem'

/** 단어 전체 리스트 Component */
function WordList() {

  // redux 내 함수 사용 선언
  const dispatch = useDispatch<typeof store.dispatch>()

  // 단어 관련 변수
  const num: number = 1000
  const value: number = parseInt(`${num / 8}`)
  const [vocaList, setVocaList]:any = useState([])

  // 페이지 관련 변수
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(value)

  useEffect(() => {
    loadData(1)
  }, [])

  // 페이지 변화에 따라 데이터 불러오기
  useEffect(() => {
    loadData(page)
    }, [page])

  /** 빅보카 데이터 로드 */
  function loadData(page: number) {
    dispatch(getVocaList(page))
      .then((res:any) =>{
        setVocaList(res.payload.data)
    })
  }

  /** 페이지네이션 동작 */
  function handlePage(event: any) {
    if (event.target.dataset.testid) {
      if (event.target.dataset.testid === "NavigateBeforeIcon" && page > 1) {
        const nowPageInt = page - 1
        setPage(nowPageInt)
      } else if (event.target.dataset.testid === "NavigateNextIcon" && page < lastPage) {
        const nowPageInt = page + 1
        setPage(nowPageInt)
      }
    } else {
      const nowPageInt = parseInt(event.target.outerText)
      setPage(nowPageInt)
    }
  }

  return (
    <Container sx={{ width:'1000px', height:'580px', backgroundImage: `url(${BackgroundImg})`}} >
      <Grid container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
      >
      { vocaList ?
          
          ( vocaList.map((item, idx) => (
            <Grid item xs={5}><WordItem key={idx} vocaData={item}/></Grid>
            ))
          ) 
          
          
          :
            <Box
            sx={{
              display: 'flex',
              fontSize: '3rem',
              justifyContent: 'center',
              paddingTop: '13rem'
            }}
          >추천해드릴 단어가 없네요</Box>
      }
        </Grid>
      { vocaList ?
        <Pagination count={lastPage} defaultPage={0} 
        boundaryCount={1}
        size="large" sx={{ paddingTop: '2rem',paddingX: '25%'}}
        onChange={(e) => handlePage(e)}
        />
        : null
      }
        
    </Container>
  )
}

export default WordList
