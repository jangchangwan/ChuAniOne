import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ChatTotalItem from './ChatTotalItem'
import Pagination from '@mui/material/Pagination'
import { getChatAll } from '../../request/openchat'

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
  
  interface Data extends RoomData {
    pageCnt: number,
    totalCnt: number,
    rDto: Partial<Data[]>
  }
  

  const [ data, setData ] = useState<Partial<RoomData[]>>([])

  const [lastPage, setLastPage] = useState<number>(1)
  // const value = parseInt(`${data.length / 5}`)

  const [page, setPage] = useState<number>(1)
  const [showData, setShowData] = useState<Data[]>([])

  useEffect(() => {
    const value: any = getChatAll(1)
    console.log(value)
    // setData(value.rDto)
    // if (data.length % 5) {
    //   setLastPage(value+1)
    // } else {
    //   setLastPage(value)
    // }
  }, [])
  
  // useEffect(() => {
  //   getPageData()
  //   }, [page])

  // async function getPageData(): Promise<void> {
    // if(page === lastPage){
    //   await setShowData(data.slice(5 * (page - 1)))
    // } else {
    //   await setShowData(data.slice(5 * (page - 1), 5 * (page - 1) + 5))
    // }  
  // }

  const handlePage = (event: any) => {
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
      { showData ?
        ( showData.map((item, idx) => (
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
