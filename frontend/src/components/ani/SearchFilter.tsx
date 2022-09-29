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
  min-height: calc(100vh - 3.5rem - 4rem);
  background-color: #f8ebed;
  padding: 2rem 1rem;
  width: calc(20% - 2rem);
  /* border: 2px solid #f37b83; */
  /* border-radius: 2rem; */
  /* min-height: 100vh; */
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

const FilterContainer = styled.div`
  & + & {
    margin-top: 1rem;
    border-top: 1px solid #333333;
  }
`

const NameBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FilterName = styled.p`
  font-weight: bold;
  cursor: default;
  /* background-color: #f37b83; */
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
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

function SearchFilter({ 
    keyword, 
    genres,
    tags,
    changeKeyword,
    addGenres,
    removeGenres,
    addTags,
    removeTags,
  }) {

  const [ showMoreGenre, setShowMoreGenre ] = useState<boolean>(false)
  const [ showMoreTag, setShowMoreTag ] = useState<boolean>(false)
  const genres_value = [
    '드라마', '로맨스', '개그', '공포', 'SF', '모험', '무협', '범죄', '스릴러',
    '스포츠', '아동', '시대물', '아이돌', '액션', '음식', '음악', '이세계', '재난',
    '치유', '하렘', '판타지', '일상', '미스터리', '추리','BL', 'GL 백합', '성인'
  ]

  const tags_value = [
    '가족', '감동', '게임', '동물', '동양풍', '두뇌싸움', '로봇', '루프물', 
    '마법소녀', '먼치킨', '무거움', '배틀', '뱀파이어', '복수', '삼각관계', '서양풍',
    '선생님', '성장', '슬픔', '시간여행', '역하렘', '연예인', '열혈', '오타쿠', 
    '요괴 및 괴물', '육아', '정치', '좀비', '주체적 여성', '짝사랑', '철학', '퇴마', '학교'
  ]

  // 키워드 변경
  const [search, setSearch] = useState<string>('')

  const searchKeyword = (e) => {
    // setSearch(search.trim())
    changeKeyword(e.target.value.trim())
  }

  // 장르 필터링
  const getGenres = (e) => {
    // console.log(e.target.checked, e.target.labels[0].innerText)
    if (e.target.checked) {
      addGenres(e.target.labels[0].innerText)
    } else {
      removeGenres(e.target.labels[0].innerText)
    }
  }

  // 태그 필터링
  const getTags = (e) => {
    // console.log(e.target.checked, e.target.labels[0].innerText)
    if (e.target.checked) {
      addTags(e.target.labels[0].innerText)
    } else {
      removeTags(e.target.labels[0].innerText)
    }
  }

  return (
    <Container>
      <SearchBox>
        <SearchInput id="outlined-basic" placeholder='검색어를 입력하세요' variant="outlined" 
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83"
          }}}}
          value={search}
          onChange={(e) => { 
            setSearch(e.target.value)
            searchKeyword(e)
          }}
          onBlur={searchKeyword}
        />
        <SearchIconBox>
          <SearchIcon1/>
        </SearchIconBox>
      </SearchBox>
      
      <FilterContainer>
        <NameBox>
          <FilterName>장르</FilterName>
          <IconBox onClick={() => {setShowMoreGenre(!showMoreGenre)}}>
            { showMoreGenre ? <MoreCloseIcon /> : <MoreIcon/> }
          </IconBox>
        </NameBox>

        <FilterBox>
          { genres_value.map((genre, idx) => (
            idx < 8 ? 
              <Filter 
                control={<Check />} label={genre} 
                onChange={(e) => {
                  getGenres(e)
                }}
              />
            : 
            (showMoreGenre ? 
              <Filter 
                control={<Check />} label={genre} 
                onChange={(e) => {
                  getGenres(e)
                }}
              /> : null)
          
          ))}
        </FilterBox>
      </FilterContainer>

      <FilterContainer>
        <NameBox>
          <FilterName>태그</FilterName>
          <IconBox onClick={() => {setShowMoreTag(!showMoreTag)}}>
            { showMoreTag ? <MoreCloseIcon /> : <MoreIcon/> }
          </IconBox>
        </NameBox>

        <FilterBox>
          { tags_value.map((tag, idx) => (
            idx < 8 ? 
              <Filter control={<Check />} label={tag} onClick={(e) => getTags(e)}/>
            : (showMoreTag ? <Filter control={<Check />} label={tag} onClick={(e) => getTags(e)}/> : null)
          ))}
        </FilterBox>
      </FilterContainer>

    </Container>
  )
}

export default SearchFilter
