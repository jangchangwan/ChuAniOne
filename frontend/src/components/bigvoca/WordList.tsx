import React, {useEffect, useState} from 'react';
import WordItem from './WordItem'
import TestItem from './TestItem'

import { getVocaList } from '../../store/bigvocaslice'
import { useDispatch } from "react-redux"
import store from '../../store'
import BackgroundImg from  '../../assets/images/wordBackgroundImg.png'
import BackgroundImg2 from  '../../assets/images/introBackground3.png'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styled from "styled-components";
import Pagination from '@mui/material/Pagination'

const ItemGrid = styled(Grid)`
  background-color : white;

  margin: 0.75rem !important;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0.5px 0.5px 0.5px 0.5px black;
`
function WordList() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [vocaList, setVocaList] = useState([])

  const num: number = 1000
  const value: number = parseInt(`${num / 8}`)
  const [lastPage, setLastPage] = useState<number>(value)

  useEffect(() => {
    dispatch(getVocaList())
      .then((res:any) =>{
        console.log(res.payload.data)
        setVocaList(res.payload.data)
      })
  }, [])
  return (
    <Container sx={{ width:'1000px', height:'580px', backgroundImage: `url(${BackgroundImg2})`}} >
      { vocaList ?
          ( vocaList.map((item, idx) => (
              <WordItem key={idx} vocaData={item}/>
            ))
          ) :
          // 단어장이 없을 경우
          //   <Box
          //   sx={{
          //     display: 'flex',
          //     fontSize: '3rem',
          //     justifyContent: 'center',
          //     paddingTop: '13rem'
          //   }}
          // >추천해드릴 단어가 없네요</Box>
          // TEST
          <Grid container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
          >
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
            <ItemGrid item xs={5}><TestItem/></ItemGrid>
          </Grid>
        }
        <Pagination count={lastPage} defaultPage={1} 
            boundaryCount={1}
            size="large" sx={{ paddingTop: '1rem',paddingX: '25%'}} 
            // showLastButton showFirstButton
          />
    </Container>
  );
}

export default WordList;
