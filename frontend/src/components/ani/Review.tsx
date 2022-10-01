import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextField from '@mui/material/TextField'
import ReviewList from './ReviewList'
import { Button } from '@mui/material'
import border1 from '../../assets/images/border1.png'
import border2 from '../../assets/images/border2.png'

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
  `

const StarTitle = styled.h3`
  margin: 0;
  margin-right: 1rem;
  padding: 0 0.3rem;
  border-bottom: 15px solid transparent;
  border-image: url(${border1}) 20 stretch;
`

const StarText = styled.h2`
  margin: 0;
  margin-left: 0.5rem;
  padding-bottom: 15px;
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


const MyReviewBox = styled.div`
  background: linear-gradient( to bottom,  #e8fabf, #f6fde4);
  /* background-color: #e8fabf ; */
  border-radius: 0.5rem;
  width: 95%;
  padding: 2.5%;
  height: auto;
`

const MyReviewTitle = styled.h3`
  margin: 0;
`

const MyReviewHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReviseDeleteBox = styled.div`
  display: flex;
  align-items: center;
`

const ReviseDeleteText = styled(Button)`
  margin: 0;
  color: #333333 !important;

  &:hover {
    color: #fa898f !important;
  }
`

const MyReviewContent = styled.p`
`

const ReviewInput = styled(TextField)`
`

const SaveBtn = styled(Button)`
`

  const ReviewTitle = styled.p`
    font-weight: bold;
    margin-bottom: 0;
    cursor: default;
    margin-top: 1rem;
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

  const [myReview, setMyReview] = useState<Review>()
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
        { isLogin ? (
          myReview ? 
            <StarBox>
              <StarTitle>내 별점</StarTitle>
              <StyledRating
                name="customized-color"
                value={myReview.rating}
                readOnly
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                style={{ paddingBottom: '15px' }}
                />
              <StarText>{myReview.rating}</StarText>
            </StarBox>
            : 
            <StarBox>
              <StarTitle>내 별점</StarTitle>
              <StyledRating
                name="customized-color"
                value={myStar}
                onChange={getStar}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                style={{ paddingBottom: '15px' }}
                />
              <StarText>{myStar}</StarText>
            </StarBox>
          ) 
        : null }

        <StarBox>
          <StarTitle>평균 별점</StarTitle>
          <StyledRating
            name="customized-color"
            value={rating}
            readOnly
            // getLabelText={(rating: number) => `${rating} Heart${rating !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            style={{ paddingBottom: '15px' }}
            />
          <StarText>{ rating }</StarText>
        </StarBox>

      </StarContainer>
      
      { isLogin ? (
        myReview ?
          <MyReviewBox>
            <MyReviewHeader>
              <MyReviewTitle>나의 리뷰</MyReviewTitle>
              <ReviseDeleteBox>
                <ReviseDeleteText>수정</ReviseDeleteText>
                <ReviseDeleteText>삭제</ReviseDeleteText>
              </ReviseDeleteBox>
            </MyReviewHeader>
  
            <MyReviewContent>
              {myReview.content}
            </MyReviewContent>
          </MyReviewBox> 
        :
          <ReviewInput 
            id="outlined-basic" 
            placeholder="이 작품에 대한 리뷰를 작성해보세요 !" 
            variant="outlined" 
            multiline rows={3}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                borderColor: "#fa898f"
            }}}}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendReview()
            }}
          />
        )
      : null }
      

        <ReviewTitle>{ count } 개의 리뷰</ReviewTitle>

      <ReviewList data={data}/>
    </Container>
  )
}

export default Review
