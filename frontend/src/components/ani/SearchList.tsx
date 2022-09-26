import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Box } from '@mui/material'
import SearchItem from './SearchItem'
import Pagination from '@mui/material/Pagination'

const Container = styled.div`
  width: calc(80% - 3rem);
  padding: 1rem 1.5rem;
`

const TopBox = styled.div`
  margin: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
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


function SearchList() {

  const num: number = 1234
  const value: number = parseInt(`${num / 12}`)
  const [lastPage, setLastPage] = useState<number>(value)
  
  useEffect(() => {
    if (num % 40) setLastPage(value+1)
  }, [])

  const [counts, setCounts] = useState<number[]>([])

  useEffect(() => {
    getCounts()
  })

  function getCounts() {
    const value: number[] = []
    for (let i=0; i<12; i++) {
      value.push(i)
    }
    setCounts(value)
  }

  return (
    <Container>
      <TopBox>
        <NumberBox>
          <NumberTextOut>총 </NumberTextOut> 
          <NumberTextIn> "{num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}"</NumberTextIn>
          <NumberTextOut>개의 작품</NumberTextOut>
        </NumberBox>

          <Pagination count={lastPage} defaultPage={1} 
            boundaryCount={1}
            size="large" sx={{margin: 2}} 
            // showLastButton showFirstButton
          />
      </TopBox>

      <Box sx={{ width: '100%' }}>
        <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          { counts.map((val, i) => (
            <Grid item xs="auto" sm="auto" md="auto">
              <SearchItem />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default SearchList
