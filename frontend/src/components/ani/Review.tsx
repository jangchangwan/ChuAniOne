import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextField from '@mui/material/TextField'
import ReviewList from './ReviewList'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { getMyReview, getReviewAll, postReview } from '../../store/anislice'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

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
  cursor: default;
`


function Review({ aniId }) {
  interface Review {
    animation: number,
    content: string,
    date: string,
    id: number,
    member_id: number,
    member_name: number,
    member_profile: string,
    rating: number
  }


  const dispatch = useDispatch<typeof store.dispatch>()
  const isLogin = useSelector((state: initialState) => (state.login.isLogin))

  const [data, setData] = useState<Review | null>(null)
  const [count, setCount] = useState<number>(0)
  const [rating, setRating] = useState<number>(0)

  const [showRating, setShowRating] = useState<number>(0)
  const [myStar, setMyStar] = useState<number>(3)

  const [myReview, setMyReview] = useState<Review | null>(null)
  const [review, setReview] = useState<string>('')

  // 리뷰 데이터 불러오기
  async function loadData() {
    const res = await dispatch(getReviewAll(aniId))
    if (res.meta.requestStatus === "fulfilled") {
      setCount(res.payload.count)
      setData(res.payload.reviewList)
      if (res.payload.rating !== "NaN") {
        setRating(res.payload.rating)
      }
    }

    if (isLogin) {
      const mine = await dispatch(getMyReview(aniId))
      if (mine.meta.requestStatus === "fulfilled" && mine.payload !=="NO") {
        setMyReview(mine.payload)
      }
    } 
  }

  // 리뷰 작성하기
  async function sendReview() {
    if (!review.trim()) return
    
    const res = await dispatch(postReview({
      id: aniId,
      content: review,
      rating: myStar,
    }))
    
    if (res.meta.requestStatus === "fulfilled") {
      setReview('')
      setMyStar(3)
      loadData()
    }
  }

  // 별점매기기
  const getStar = (event: any): void => {
    setMyStar(event.target.value)
  }

  useEffect(() => {
    loadData()
  }, [aniId])


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
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </StarBox>

        <StarBox>
          <StarTitle>평균 별점</StarTitle>
          <StarText>{ rating }</StarText>
          <StyledRating
            name="customized-color"
            value={rating}
            readOnly
            getLabelText={(rating: number) => `${rating} Heart${rating !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </StarBox>
      </StarContainer>
      <ReviewInput 
        id="outlined-basic" 
        placeholder="이 작품에 대한 리뷰를 작성해보세요 !" 
        variant="outlined" 
        multiline rows={3}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) sendReview()
        }}
      />

        <ReviewTitle>{ count } 개의 리뷰</ReviewTitle>

      <ReviewList data={data}/>
    </Container>
  )
}

export default Review
