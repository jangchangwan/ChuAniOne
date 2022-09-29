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
  const [genres, setGenres] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  // 검색어 변경
  const changeKeyword = (value: string) => {
    setKeyword(value)
  }

  // 장르 필터링
  const addGenres = (value: string) => {
    setGenres([...genres, value])
  }

  const removeGenres = (value: string) => {
    const filtered = genres.filter((element) => element !== value)
    setGenres(filtered)
  }

  // 태그 필터링
  const addTags = (value: string) => {
    setTags([...tags, value])
  }

  const removeTags = (value: string) => {
    const filtered = tags.filter((element) => element !== value)
    setTags(filtered)
  }

  return (
    <Container>
      <SearchFilter 
        keyword={keyword} 
        genres={genres}
        tags={tags}
        changeKeyword={changeKeyword}
        addGenres={addGenres}
        removeGenres={removeGenres}
        addTags={addTags}
        removeTags={removeTags}
      />
      <SearchList 
        keyword={keyword} 
        genres={genres}
        tags={tags}
        changeKeyword={changeKeyword}
        addGenres={addGenres}
        removeGenres={removeGenres}
        addTags={addTags}
        removeTags={removeTags}
      />
    </Container>
  )
}

export default AniSearch
