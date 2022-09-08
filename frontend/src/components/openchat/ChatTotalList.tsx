import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ChatTotalItem from './ChatTotalItem'
import Pagination from '@mui/material/Pagination'

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
  interface Data {
    room_name: string,
    hashTags: string[],
    now_num: number,
    max_num: number
  }

  const data: Array<Data> = [{
    room_name: '소영이의 수다방1',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방2',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방3',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방4',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방5',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방6',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방7',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  },
  {
    room_name: '소영이의 수다방8',
    hashTags: [
      'SSAFY', 'E104', '특화프로젝트'
    ],
    now_num: 2,
    max_num: 4
  }
  ]

  const [lastPage, setLastPage] = useState<number>(1)
  const value = parseInt(`${data.length / 5}`)

  const [page, setPage] = useState<number>(1)
  const [showData, setShowData] = useState<Data[]>([])

  useEffect(() => {
    if (data.length % 5) {
      setLastPage(value+1)
    } else {
      setLastPage(value)
    }
  }, [])
  
  useEffect(() => {
    getPageData()
    }, [page])

  async function getPageData(): Promise<void> {
    if(page === lastPage){
      await setShowData(data.slice(5 * (page - 1)))
    } else {
      await setShowData(data.slice(5 * (page - 1), 5 * (page - 1) + 5))
    }  
  }

  const handlePage = (event: any) => {
    const nowPageInt = parseInt(event.target.outerText)
    setPage(nowPageInt)
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
