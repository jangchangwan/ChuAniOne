import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import AniDetail from './AniDetail'

const Container = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const ImgBox = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 0.4rem;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
`

const Name = styled.p`
  margin: 0;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

const styleBoxDetail = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  border: 'none',
  boxShadow: 24,
}

/** 검색 아이템 */
function SearchItem({ ani }) {
  
  /** data type */
  const data = {
    id: ani.ani_id,
    name: ani.name,
    img: ani.images[0].img_url,
    is_adult: ani._adult,
  }

  /** 상세페이지 모달 */
  const [showDetail, setShowDetail] = useState<boolean>(false)

  /** 상세페이지 모달 열기 */
  const handleOpenDetail = () => {
    setShowDetail(true)
  }

  /** 상세페이지 모달 닫기 */
  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  return (
    <Container>
      <ImgBox onClick={handleOpenDetail}>
        <Img src={data.img}/>
      </ImgBox>
      <Name  onClick={handleOpenDetail}>{data.name}</Name>

      { showDetail ?
        <Modal
          open={showDetail}
          onClose={handleCloseDetail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBoxDetail}>
            <AniDetail aniId={data.id}/>
          </Box>
        </Modal>
        : null
      }

    </Container>
  )
}

export default SearchItem
