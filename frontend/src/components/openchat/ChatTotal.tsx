import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import ChatTotalList from './ChatTotalList'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'

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

function ChatTotal() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [searchText, setSearchText] = useState<string>('')
  return (
    <Container>
      <SearchBox>
        <SearchInput id="outlined-basic" placeholder='검색어를 입력하세요' variant="outlined" 
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83"
          }}}}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <SearchIconBox>
          <SearchIcon1/>
        </SearchIconBox>
      </SearchBox>
      <ChatTotalList />
    </Container>
  )
}

export default ChatTotal
