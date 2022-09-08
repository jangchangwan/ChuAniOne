import React from 'react'
import styled from 'styled-components'
import MyReviewItem from './MyReviewItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

function MyReview() {
  return (
    <div>
      <h1>MyReview</h1>
      {/* <Container> */}
        <MyReviewItem/>
        <MyReviewItem/>
        <MyReviewItem/>
        <MyReviewItem/>
      {/* </Container> */}
    </div>
  );
}

export default MyReview;
