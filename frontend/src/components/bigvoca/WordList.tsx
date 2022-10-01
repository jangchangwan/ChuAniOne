import React, {useEffect, useState} from 'react';
import WordItem from './WordItem'

import { getVocaList } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'
import BackgroundImg from  '../../assets/images/wordBackgroundImg.png'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styled from "styled-components";
import Pagination from '@mui/material/Pagination'

const ItemGrid = styled(Grid)`

`
function WordList() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [vocaList, setVocaList]:any = useState([])

  const num: number = 1000
  const value: number = parseInt(`${num / 8}`)
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(value)

  useEffect(() => {
    loadData(1)
  }, [])

  // 페이지 변화에 따라 데이터 불러오기
  useEffect(() => {
    loadData(page)
    }, [page])

  function loadData(page: number) {
    dispatch(getVocaList(page))
      .then((res:any) =>{
        console.log(res);
        
        setVocaList(res.payload.data)
    })
  }

  // 페이지네이션 동작
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
            <ItemGrid item xs={5}><WordItem key={idx} vocaData={item}/></ItemGrid>
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
  );
}

export default WordList;
