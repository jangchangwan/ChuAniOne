import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MyChatItem from './MyChatItem'
import Pagination from '@mui/material/Pagination'

// redux
import { useDispatch } from 'react-redux'
import { getMyChat } from '../../store/openchatslice'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'
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

function MyChatList() {
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
  const userId = useSelector((state: initialState) => state.login.userId)
  
  const [data, setData] = useState<Partial<RoomData[]>>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

    // 초기 데이터 불러오기
    useEffect(() => {
      loadData(userId, page)
    }, [])
    
    // 페이지 변화에 따라 데이터 불러오기
    useEffect(() => {
      loadData(userId, page)
      }, [page])
  
    // 데이터 불러오기
    async function loadData(userId: number, page: number) {
      const res: any = await dispatch(getMyChat({ userId, page }))
      if (res.type === "GETMYCHAT/fulfilled") {
        await setLastPage(res.payload.data.pageCnt)
        await setData(res.payload.data.rDto)
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
            <MyChatItem chatData={item}/>
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

export default MyChatList
