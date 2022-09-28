import React, { useState } from 'react'
import styled from 'styled-components'
import SearchList from './SearchList'
import SearchFilter from './SearchFilter'


const Container = styled.div`
  padding: 0 10rem;
  padding-top: 3.5rem;
  width: calc(100% - 20rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function AniSearch() {
  const [keyword, setKeyword] = useState<string>('')

  const changeKeyword = (value: string) => {
    setKeyword(value)
  }

  return (
    <Container>
      <SearchFilter changeKeyword={changeKeyword}/>
      <SearchList keyword={keyword}/>
    </Container>
  )
}

export default AniSearch
