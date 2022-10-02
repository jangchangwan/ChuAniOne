import React from 'react'
import styled from 'styled-components'
import lineImg from '../../assets/images/line.png'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating'

// redux
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

const Container = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  width: 95%;
  padding: 2.5%;
  height: auto;
  background: linear-gradient( to bottom,  #ffe0e0, #fff0f0);
  color: #333333;
  /* background-color: #fff0f0; */
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-image: url(${lineImg});
  background-size: 100% 100%;
  padding: 0 1rem;
  margin: 0;
`

const DateBox = styled.div`
`

const DateText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #333333;
`

const StyledRating = styled(Rating)(
  {
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})

const RatingText = styled.p`
  margin: 0;
  margin-left: 0.5rem;
  font-size: 1.2rem;
`


const ReviewText = styled.p`
  margin: 0;
`


function ReviewItem({ data }) {
  const userId = useSelector((state: initialState) => (state.login.userId))

  return (
    <Container>
      <Header>
        <UserBox>
          <UserName>{data.member_name}</UserName>
          <StyledRating
              name="customized-color"
              value={data.rating}
              readOnly
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          <RatingText>{data.rating}</RatingText>
        </UserBox>
        <DateBox>
          <DateText>{`작성일 : ${data.date[0]}.${data.date[1]}.${data.date[2]}`}</DateText>
        </DateBox>
      </Header>
      <ReviewText>
        {data.content}
      </ReviewText>
    </Container>
  )
}

export default ReviewItem
