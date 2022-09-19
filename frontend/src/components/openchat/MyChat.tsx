import React, { useEffect } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import MyChatList from './MyChatList'


const Container = styled.div`
  width: 80%;
  padding: 0 10%;
  height: 100%;
  /* background-color: green; */
`
const SearchBox = styled.div`
  width: 96%;
  position: relative;
  padding: 2%;
`

const SearchInput = styled(TextField)`
  width: 100%;

  fieldset {
    border-radius: 1.5rem;
  }
`

const SearchIconBox = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  height: calc(100% - 2rem);
  aspect-ratio: 1/1;
  cursor: pointer;
`
const SearchIcon1 = styled(SearchIcon)`
  width: 75% !important;
  height: 75% !important;
  padding: 12.5%;
  color: #505050;
`



function MyChat() {
  return (
    <Container>
      <SearchBox>
        <SearchInput id="outlined-basic" placeholder='검색어를 입력하세요' variant="outlined" 
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83"
          }}}}/>
        <SearchIconBox>
          <SearchIcon1/>
        </SearchIconBox>
      </SearchBox>
      <MyChatList />
    </Container>
  )
}

export default MyChat
