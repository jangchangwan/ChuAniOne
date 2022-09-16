import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ChatTotalItem from './ChatTotalItem'
import Pagination from '@mui/material/Pagination'
import { getChatAll } from '../../store/openchatslice'
import { useDispatch } from 'react-redux'
import store from '../../store'

const Container = styled.div`
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


function ChatTotalList() {
  interface RoomData {
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

  const [data, setData] = useState<Partial<RoomData[]>>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

  // 초기 데이터 불러오기
  useEffect(() => {
    loadData(1)
  }, [])
  
  // 페이지 변화에 따라 데이터 불러오기
  useEffect(() => {
    loadData(page)
    }, [page])

  // 데이터 불러오기
  async function loadData(page: number) {
    const val = await dispatch(getChatAll(page))
    await console.log(val)
    if (val.type === "GETCHATALL/fulfilled") {
      await setLastPage(val.payload.pageCnt)
      await setData(val.payload.rDto)
    }
  } 

  // 페이지네이션 동작
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
      { data ?
        ( data.map((item, idx) => (
            <ChatTotalItem chatData={item}/>
          ))
        ) : null
      }
      <PageBox>
        <Pagination count={lastPage} defaultPage={1} boundaryCount={2} 
          size="large" sx={{margin: 2}} onChange={(e) => handlePage(e)} />
      </PageBox>
    </Container>
  )
}

export default ChatTotalList
