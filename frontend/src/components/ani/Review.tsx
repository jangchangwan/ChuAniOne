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

/** ???????????????: ?????? */
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
    data: ?????? ??????
    count: ?????? ??????
    rating: ?????? ??????
    myStar: ??? ??????
    myReview: ??? ?????? ?????????
    review: ???????????? ??????
    delModal: ?????? ?????? ??????
    revise: ?????? ?????? ??????
  **/
  const [data, setData] = useState<Review | null>(null)
  const [count, setCount] = useState<number>(0)
  const [rating, setRating] = useState<number>(0)
  const [myStar, setMyStar] = useState<number>(3)

  const [myReview, setMyReview] = useState<Review>()
  const [review, setReview] = useState<string>('')

  const [delModal, setDelModal] = useState<boolean>(false)
  const [revise, setRevise] = useState<boolean>(false)

  /** ?????? & ??? ??????????????? ???????????? */
  async function loadData() {

    // ?????? ?????? ????????? ????????????
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

    // ??? ??????????????? ????????????
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


  /** ?????? ?????? */
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

  /** ?????? ?????? ???, Django??? ?????? */
  function sendDjango() {
    axios.post(`https://j7e104.p.ssafy.io/server/v1/recomm/surprise`,
  // axios.post(`https://localhost:8080/server/v1/recomm/surprise`,
      {
        member_id: 6000000 + member_id,
        ani_id: aniId,
        score: myStar,
        content: review,
      }
    )
  }
  
  /** ?????? ?????? */
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


  /** ?????? ?????? */
  async function delReview() {
    if (myReview) {
      await dispatch(deleteReview(myReview.id))
    }
    closeDelModal()
    loadData()
  }

  /** ?????? ????????? */
  const getStar = (event: any): void => {
    setMyStar(event.target.value)
  }

  /** ?????? ?????? ?????? */
  const openDelModal = () => {
    setDelModal(true)
  }

  /** ?????? ?????? ?????? */
  const closeDelModal = () => {
    setDelModal(false)
  }

  // ?????????????????? ?????? ????????? ????????????
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
                <StarTitle>??? ??????</StarTitle>
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
                <StarTitle>??? ??????</StarTitle>
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
              <StarTitle>??? ??????</StarTitle>
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
          <StarTitle>?????? ??????</StarTitle>
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
              <MyReviewTitle>?????? ??????</MyReviewTitle>
              <ReviseDeleteBox>
                <ReviseDeleteText onClick={() => setRevise(true)}>??????</ReviseDeleteText>
                <ReviseDeleteText onClick={openDelModal}>??????</ReviseDeleteText>
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
                placeholder="??? ????????? ?????? ????????? ?????????????????? !" 
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
                <SaveBtn onClick={reviseReview}>??????</SaveBtn>
                <SaveBtn onClick={() => {
                  setRevise(false)
                  setReview(myReview.content)
                  setMyStar(myReview.rating)
                }}>??????</SaveBtn>
              </BtnBox>
            </WriteReview>
          : 
            <WriteReview>
              <ReviewInput 
                id="outlined-basic" 
                placeholder="??? ????????? ?????? ????????? ?????????????????? !" 
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
                <SaveBtn onClick={sendReview}>??????</SaveBtn>
              </BtnBox>
            </WriteReview>
        )
        
      ) : null }
      
      {/* ?????? ?????? ?????? */}
      <Dialog
        open={delModal}
        onClose={closeDelModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"????????? ?????????????????????????"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ????????? ??????, ????????? ?????? ????????? ??? ????????????.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delReview}>??????</Button>
          <Button onClick={closeDelModal} autoFocus>??????</Button>
        </DialogActions>
      </Dialog>
      
      <ReviewTitle>{ count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } ?????? ??????</ReviewTitle>
      <ReviewList data={data}/>
    </Container>
  )
}

export default Review
