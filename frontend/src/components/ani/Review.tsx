import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextField from '@mui/material/TextField'
import ReviewList from './ReviewList'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import border2 from '../../assets/images/border2.png'
import axios from 'axios'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { deleteReview, getMyReview, getReviewAll, postReview, patchReview } from '../../store/anislice'
import { useSelector } from 'react-redux'
import initialState from '../../store/Loginslice'

const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333333;
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
  margin-right: 0.7rem;
  padding: 0 0.5rem;
  border-bottom: 15px solid transparent;
  border-image: url(${border2}) 20 stretch;
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
  white-space: pre-wrap;
`

const ReviewInput = styled(TextField)`
`

const ReviewTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  cursor: default;
  margin-top: 1rem;
`

const WriteReview = styled.div`
  position: relative;
  width: 100%;
`

const BtnBox = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

const SaveBtn = styled(Button)`
  color: #333333 !important;

  &:hover {
    color: #fa898f !important;
  }
`

/** 상세페이지: 리뷰 */
function Review({ aniId }) {
  /** review type */
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
  const member_id = useSelector((state: initialState) => (state.login.userId))

  /** 
    data: 리뷰 목록
    count: 리뷰 개수
    rating: 평균 별점
    myStar: 내 별점
    myReview: 내 리뷰 데이터
    review: 작성하는 리뷰
    delModal: 삭제 확인 모달
    revise: 수정 상태 여부
  **/
  const [data, setData] = useState<Review | null>(null)
  const [count, setCount] = useState<number>(0)
  const [rating, setRating] = useState<number>(0)
  const [myStar, setMyStar] = useState<number>(3)

  const [myReview, setMyReview] = useState<Review>()
  const [review, setReview] = useState<string>('')

  const [delModal, setDelModal] = useState<boolean>(false)
  const [revise, setRevise] = useState<boolean>(false)

  /** 전체 & 내 리뷰데이터 불러오기 */
  async function loadData() {

    // 전체 리뷰 데이터 불러오기
    const res = await dispatch(getReviewAll(aniId))
    if (res.meta.requestStatus === "fulfilled") {
      setCount(res.payload.count)
      setData(res.payload.reviewList)
      if (res.payload.rating !== "NaN") {
        setRating(Math.floor(res.payload.rating*100)/100)
      } else {
        setRating(0)
      }
    }

    // 내 리뷰데이터 불러오기
    if (isLogin) {
      const mine = await dispatch(getMyReview(aniId))
      if (mine.meta.requestStatus === "fulfilled" && mine.payload !=="NO") {
        setMyReview(mine.payload)
        setReview(mine.payload.content)
        setMyStar(mine.payload.rating)
      } else {
        setMyReview(undefined)
        setReview('')
        setMyStar(3)
      }
    } 
  }


  /** 리뷰 작성 */
  async function sendReview() {
    if (!review.trim()) return

    const res = await dispatch(postReview({
      id: aniId,
      content: review,
      rating: myStar,
    }))

    sendDjango()
    
    if (res.meta.requestStatus === "fulfilled") {
      await setReview('')
      await setMyStar(3)
      await loadData()
    }
  }

  /** 리뷰 작성 시, Django로 전송 */
  function sendDjango() {
    axios.post(`https://j7e104.p.ssafy.io/server/v1/recomm`, 
    // axios.post(`http://localhost:8000/server/v1/recomm`, 
      {
        member_id: 6000000 + member_id,
        ani_id: aniId,
        score: myStar,
        content: review,
      }
    )
  }
  
  /** 리뷰 수정 */
  async function reviseReview() {
    if (!review.trim()) return 

    if (myReview) {
      const res = await dispatch(patchReview({
        id: myReview.id,
        content: review,
        rating: myStar,
      }))
      
      if (res.meta.requestStatus === "fulfilled") {
        setReview('')
        setMyStar(3)
        loadData()
        setRevise(false)
      }
    }
  }


  /** 리뷰 삭제 */
  async function delReview() {
    if (myReview) {
      const res = await dispatch(deleteReview(myReview.id))
    }
    closeDelModal()
    loadData()
  }

  /** 별점 매기기 */
  const getStar = (event: any): void => {
    setMyStar(event.target.value)
  }

  /** 삭제 모달 열기 */
  const openDelModal = () => {
    setDelModal(true)
  }

  /** 삭제 모달 닫기 */
  const closeDelModal = () => {
    setDelModal(false)
  }

  // 애니메이션에 따라 데이터 불러오기
  useEffect(() => {
    loadData()
  }, [aniId])

  return (
    <Container>
      <StarContainer>
        { isLogin ? (
          myReview ? 
            ( revise ?
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
              :
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
              )
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
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            style={{ paddingBottom: '15px' }}
            />
          <StarText>{ rating }</StarText>
        </StarBox>

      </StarContainer>
      
      { isLogin ? (

        myReview && !revise ?
          <MyReviewBox>
            <MyReviewHeader>
              <MyReviewTitle>나의 리뷰</MyReviewTitle>
              <ReviseDeleteBox>
                <ReviseDeleteText onClick={() => setRevise(true)}>수정</ReviseDeleteText>
                <ReviseDeleteText onClick={openDelModal}>삭제</ReviseDeleteText>
              </ReviseDeleteBox>
            </MyReviewHeader>
  
            <MyReviewContent>
              {myReview.content}
            </MyReviewContent>
          </MyReviewBox> 
        :
          (
            myReview && revise ?
            <WriteReview>
              <ReviewInput 
                id="outlined-basic" 
                placeholder="이 작품에 대한 리뷰를 작성해보세요 !" 
                variant="outlined" 
                multiline rows={3}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                    borderColor: "#fa898f"
                  }}
                }}
                InputProps={{ sx: { paddingRight: '9rem' } }}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.shiftKey) setReview(`${review}\n`)
                }}
                fullWidth
              />
              <BtnBox>
                <SaveBtn onClick={reviseReview}>저장</SaveBtn>
                <SaveBtn onClick={() => {
                  setRevise(false)
                  setReview(myReview.content)
                  setMyStar(myReview.rating)
                }}>취소</SaveBtn>
              </BtnBox>
            </WriteReview>
          : 
            <WriteReview>
              <ReviewInput 
                id="outlined-basic" 
                placeholder="이 작품에 대한 리뷰를 작성해보세요 !" 
                variant="outlined" 
                multiline rows={3}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                    borderColor: "#fa898f"
                  }}
                }}
                InputProps={{ sx: { paddingRight: '5rem' } }}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
              />

              <BtnBox>
                <SaveBtn onClick={sendReview}>저장</SaveBtn>
              </BtnBox>
            </WriteReview>
        )
        
      ) : null }
      
      {/* 리뷰 삭제 모달 */}
      <Dialog
        open={delModal}
        onClose={closeDelModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"리뷰를 삭제하시겠습니까?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제할 경우, 리뷰를 다시 확인할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delReview}>삭제</Button>
          <Button onClick={closeDelModal} autoFocus>취소</Button>
        </DialogActions>
      </Dialog>
      
      <ReviewTitle>{ count } 개의 리뷰</ReviewTitle>
      <ReviewList data={data}/>
    </Container>
  )
}

export default Review
