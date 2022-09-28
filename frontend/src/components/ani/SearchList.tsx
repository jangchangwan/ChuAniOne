import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Box } from '@mui/material'
import SearchItem from './SearchItem'
import Pagination from '@mui/material/Pagination'

// redux
import { useDispatch } from 'react-redux'
import { getAniAll } from '../../store/anislice'
import store from '../../store'

const Container = styled.div`
  width: calc(80% - 3rem);
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopBox = styled.div`
  width: 90%;
  margin: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const NumberBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const NumberTextOut = styled.p`
  margin-right: 0.3rem;
`

const NumberTextIn = styled.h2`
  color: #f37b83;
  margin-right: 0.3rem;
`


function SearchList({ keyword }) {

  const dispatch = useDispatch<typeof store.dispatch>()

  const [data, setData] = useState<any>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [lastPage, setLastPage] = useState<number>(1)
  
  useEffect(() => {
    loadData(page)
  }, [page, keyword])


  // 데이터 불러오기
  async function loadData(page: number) {
    const res = await dispatch(getAniAll(page))

    if (res.meta.requestStatus === "fulfilled") {
      setLastPage(res.payload.pageCnt)
      setData(res.payload.rDto)
      setTotal(res.payload.totalCnt)
    } 
  } 
  

  // 페이지네이션 동작
  function handlePage(event: any) {
    if (event.target.innerText) {
      const nowPageInt = parseInt(event.target.innerText)
      setPage(nowPageInt)
    }
    console.log(event)
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
    <Container>
      <TopBox>
        <NumberBox>
          <NumberTextOut>총 </NumberTextOut> 
          <NumberTextIn> "{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}"</NumberTextIn>
          <NumberTextOut>개의 작품</NumberTextOut>
        </NumberBox>

          <Pagination 
            count={lastPage} 
            defaultPage={1} 
            boundaryCount={1}
            size="large" 
            sx={{margin: 2}} 
            onChange={(e) => handlePage(e)}
          />
      </TopBox>

      <Box sx={{ width: '92%' }}>
        <Grid container columnSpacing={2} >
          { data.map((ani, i) => (
            <Grid item xs={12} sm={6} md={3}>
              <SearchItem ani={ani}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default SearchList
