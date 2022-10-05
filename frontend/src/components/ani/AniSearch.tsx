import React, { useState } from 'react'
import styled from 'styled-components'
import SearchList from './SearchList'
import SearchFilter from './SearchFilter'


const Container = styled.div`
  padding: 0 10rem;
  padding-top: 6rem;
  width: calc(100% - 20rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
`


/** 검색페이지 */
function AniSearch() {

  /**
    keyword: 검색 키워드
    genres: 장르 필터링
    tags: 태그 필터링
  **/
  const [keyword, setKeyword] = useState<string>('')
  const [genres, setGenres] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  /** 검색 키워드 변경 */
  const changeKeyword = (value: string) => {
    setKeyword(value)
  }

  /** 장르 추가 */
  const addGenres = (value: string) => {
    setGenres([...genres, value])
  }

  /** 장르 삭제 */
  const removeGenres = (value: string) => {
    const filtered = genres.filter((element) => element !== value)
    setGenres(filtered)
  }

  /** 태그 추가 */
  const addTags = (value: string) => {
    setTags([...tags, value])
  }

  /** 태그 삭제 */
  const removeTags = (value: string) => {
    const filtered = tags.filter((element) => element !== value)
    setTags(filtered)
  }

  return (
    <Container>
      {/* 검색 키워드, 필터 */}
      <SearchFilter 
        changeKeyword={changeKeyword}
        addGenres={addGenres}
        removeGenres={removeGenres}
        addTags={addTags}
        removeTags={removeTags}
      />

      {/* 검색 결과 목록 */}
      <SearchList 
        keyword={keyword} 
        genres={genres}
        tags={tags}
      />
    </Container>
  )
}

export default AniSearch
