import React,  { useState } from 'react'

// styled component
import styled from 'styled-components'

// 하위 컴포넌트
import AniDetail from '../ani/AniDetail'

// MUI
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

//redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { setAniId, resetAniId } from '../../store/anislice'


const Container = styled.div`
  height: 100%;
`

const AniBox = styled.div`
  height: 100%;
  cursor: pointer;
`

const AniImgBox = styled.div`
  margin-top: 0.5rem;
  height: 70%;
  width: 95%;
  overflow: hidden;
`

const AniImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
`

const AniName = styled.p`
  margin: 0;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

/** 상세 애니 페이지 */
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

/** 애니 더보기 */
function MyAniMoreItem(myAniData) {

  const dispatch = useDispatch<typeof store.dispatch>()

  // 상세페이지 연동
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  
    // 상세페이지 켜기
    async function handleOpenDetail (aniId) {
      await dispatch(setAniId(aniId))
      setOpenDetail(true)
    }
    // 상세페이지 끄기
    async function handleCloseDetail () {
      await dispatch(resetAniId())
      setOpenDetail(false)
    }

  return (
    <Container>
      <AniBox onClick={() => handleOpenDetail(myAniData.myAniData.ani_id)}>
        <AniImgBox>
          <AniImg src={myAniData.myAniData.img} alt={myAniData.myAniData.name} />
        </AniImgBox>
        <AniName>{myAniData.myAniData.name}</AniName>
      </AniBox>
      
      <Modal
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBoxDetail}>
          <AniDetail />
        </Box>
      </Modal>

    </Container>
  )
}

export default MyAniMoreItem
