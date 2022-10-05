import React from 'react'
import styled from 'styled-components'
import ReviewItem from './ReviewItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

/** 리뷰 리스트 */
function ReviewList({ data }) {
  return (
    <Container>
      { data ? (
        data.map((item, idx) => (
          <ReviewItem key={idx} data={item}/> 
        ))
      ) : null }

    </Container>
  )
}

export default ReviewList
