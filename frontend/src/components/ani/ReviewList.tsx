import React from 'react'
import styled from 'styled-components'
import ReviewItem from './ReviewItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

function ReviewList() {
  return (
    <Container>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
    </Container>
  )
}

export default ReviewList
