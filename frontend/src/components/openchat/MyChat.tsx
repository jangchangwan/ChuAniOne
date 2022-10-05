import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import MyChatItem from './MyChatItem'
import Pagination from '@mui/material/Pagination'

// redux
import { useDispatch } from 'react-redux'
import { getMyChat, searchMyChat } from '../../store/openchatslice'
import store from '../../store'

const Container = styled.div`
  width: 80%;
  padding: 0 10%;
  height: 100%;
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

const MyChatList = styled.div`
  width: 96%;
  height: calc(96% - 56px);
  padding: 0 2%;
  position: relative;
`

const PageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -4rem;
  left: 0;
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

/** 내 채팅방 목록 */
function MyChat({ handleOpened }: any) {
  /** roomDate type */
  interface RoomData {
    id: number,
    name: string,
    tag1: string,
    tag2: string,
    tag3: string,
    memberId: number,
    nickname: string,
    max: number,
    count: number, 
  }

  const dispatch = useDispatch<typeof store.dispatch>()

  /** 
    keyword: 내 채팅방 검색 키워드
    data: 채팅방 목록 데이터
    page: 현재 페이지
    lastPage: 마지막 페이지
   */
  const [keyword, setKeyword] = useState<string>('')

  const [data, setData] = useState<Partial<RoomData[]>>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

  // 초기 데이터 불러오기
  useEffect(() => {
    loadData(page)
  }, [keyword, page])
  
  /** 데이터 불러오기 */
  async function loadData(page: number) {

    // 키워드 있는 경우
    if (keyword.trim()) {
      const res: any = await dispatch(searchMyChat({keyword, page}))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        await setLastPage(res.payload.pageCnt)
        await setData(res.payload.rDto)
      }

    } else {
    // 키워드가 없는 경우
      const res = await dispatch(getMyChat(page))
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        await setLastPage(res.payload.pageCnt)
        await setData(res.payload.rDto)
      }
    }
  } 

  /** 페이지네이션 */
  function handlePage(event: any) {
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
      {/* 검색 */}
      <SearchBox>
        <SearchInput id="outlined-basic" placeholder='검색어를 입력하세요' variant="outlined" 
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
              borderColor: "#f37b83"
          }}}}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
        <SearchIconBox>
          <SearchIcon1/>
        </SearchIconBox>
      </SearchBox>
      
      {/* 채팅방 목록 */}
      <MyChatList>
        { data ?
          ( data.map((item, idx) => (
            <MyChatItem 
              key={idx}
              roomData={item}
              handleOpened={handleOpened}
            />
          ))) 
        : null
        }

        {/* 페이지 네이션 */}
        <PageBox>
          <Pagination count={lastPage} defaultPage={1} boundaryCount={2}
            size="large" sx={{ margin: 2 }} onChange={(e) => handlePage(e)} />
        </PageBox>
      </MyChatList>
    </Container>
  )
}

export default MyChat
