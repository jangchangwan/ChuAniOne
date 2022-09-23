import React from 'react'
import styled from 'styled-components'
import profileImg from '../../assets/images/profile.png'

const Container = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  width: 95%;
  padding: 2.5%;
  height: auto;
  background-color: #fff0f0;
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const UserImgBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
`

const UserImg = styled.img`
  width: 100%;
  height: 100%;
`

const UserName = styled.h3` 
  margin: 0;
`

const ReviewText = styled.p`
  margin: 0;
`

function ReviewItem() {
  return (
    <Container>
      <UserBox>
        <UserImgBox>
          <UserImg src={profileImg}/>
        </UserImgBox>
        <UserName>User</UserName>
      </UserBox>
      <ReviewText>
        너무너무 재밌어요 !
      </ReviewText>
    </Container>
  )
}

export default ReviewItem
