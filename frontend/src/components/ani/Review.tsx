import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextField from '@mui/material/TextField'
import ReviewList from './ReviewList'


const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const StarBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`

const StarTitle = styled.h3`
  margin: 0;
`

const StarText = styled.h1`
  margin: 0.7rem;
`

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})


const ReviewInput = styled(TextField)`
`

const ReviewTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0;
`


function Review({ recommend }: any): any {
  const [myStar, setMyStar] = useState<number>(3);

  const getStar = (event: any): void => {
    // console.log(event)
    setMyStar(event.target.value)
  }

  return (
    <Container>
      <StarContainer>
        <StarBox>
          <StarTitle>내 별점</StarTitle>
          <StarText>{myStar}</StarText>
          <StyledRating
            name="customized-color"
            value={myStar}
            onChange={getStar}
            // getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </StarBox>

        <StarBox>
          <StarTitle>평균 별점</StarTitle>
          <StarText>{recommend.avg_rating}</StarText>
          <StyledRating
            name="customized-color"
            defaultValue={recommend.avg_rating}
            readOnly
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </StarBox>
      </StarContainer>
      <ReviewInput id="outlined-basic" placeholder="이 작품에 대한 리뷰를 작성해보세요 !" variant="outlined" multiline rows={3}/>
        <ReviewTitle>리뷰</ReviewTitle>
      <ReviewList/>
    </Container>
  )
}

export default Review;
