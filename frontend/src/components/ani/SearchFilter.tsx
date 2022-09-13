import React, { useState } from 'react'
import styled from 'styled-components'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'


const Container = styled.div`
  position: sticky;
  /* height: calc(100vh - 3.5rem - 4rem); */
  background-color: #f8ebed;
  padding: 2rem 1rem;
  width: calc(20% - 2rem);
  /* border: 2px solid #f37b83; */
  /* border-radius: 2rem; */
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

const NameBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FilterName = styled.p`
  font-weight: bold;
`

const IconBox = styled(IconButton)`
  height: 100%;
`

const MoreIcon = styled(AddIcon)`
  height: 100%;
  aspect-ratio: 1 / 1;
  `
  
  const MoreCloseIcon = styled(RemoveIcon)`
    height: 100%;
  `

const FilterBox = styled(FormGroup)`
  display: flex !important;
  flex-direction: row !important;
`

const Filter = styled(FormControlLabel)`
  width: 40%;
`

const Check = styled(Checkbox)`
  &&.MuiCheckbox-colorPrimary.Mui-checked {
    color: #f37b83 !important;
  }
`

function SearchFilter() {
  const [ showMoreFilter, setShowMoreFilter ] = useState<boolean>(false)

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

      <NameBox>
        <FilterName>장르</FilterName>
        <IconBox onClick={() => {setShowMoreFilter(!showMoreFilter)}}>
          { showMoreFilter ? <MoreCloseIcon /> : <MoreIcon/> }
        </IconBox>
      </NameBox>

      <FilterBox>
        <Filter control={<Check />} label="미스터리" />
        <Filter control={<Check />} label="로맨스" />
        <Filter control={<Check />} label="로맨스" />
        <Filter control={<Check />} label="로맨스" />
        <Filter control={<Check />} label="로맨스" />
        <Filter control={<Check />} label="로맨스" />
        { showMoreFilter ? 
          <>
            <Filter control={<Check />} label="로맨스" />
            <Filter control={<Check />} label="로맨스" />
            <Filter control={<Check />} label="로맨스" />
            <Filter control={<Check />} label="로맨스" />
          </> : null
        }
      </FilterBox>
    </Container>
  )
}

export default SearchFilter
