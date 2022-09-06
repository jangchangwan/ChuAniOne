import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'


const ContentBox = styled.div`
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


function Review({ recommend }: any): any {
  const [myStar, setMyStar] = useState<number>(3);

  const getStar = (event: any): void => {
    // console.log(event)
    setMyStar(event.target.value)
  }

  return (
    <ContentBox>
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
      <h1>리뷰</h1>
      <ReviewInput id="outlined-basic" placeholder="리뷰를 입력하세요" variant="outlined" multiline rows={3}/>
      
    </ContentBox>
  );
}

export default Review;
