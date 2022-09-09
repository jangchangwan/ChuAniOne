import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;
`

// 도서 검색 api
// https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
// API_KEY: ce81ceb089f0c1a77ce0ca4319d5edea
// Headers
// Authorization: 'KakaoAK ce81ceb089f0c1a77ce0ca4319d5edea'
/** 
  Params: {
    query: name,
  }
**/


function Books({recommend}: any): any {
  const [searchName, setSearchName] = useState<string>(recommend.name)

  // 1. 정규식으로 괄호 사이 삭제
  // 2. : 뒤에 내용 삭제
  // 3. 제거할 단어 제거
  const deleteWords: string[] = [
    '(더빙) ',
    '(자막) ',
    '극장판 ',
    '(무삭제) ',
    '(스튜딘 버전)',
    '스페셜',
    '(리마스터링)',
    '리마스터',
    '동요',
    'OAD',
  ]

  useEffect(() => {

  }, [])

  async function getName(): Promise<void> {
    let name: string = recommend.name
    
  }

  return (
    <Container>
      <h1>Books</h1>
    </Container>
  )
}

export default Books
