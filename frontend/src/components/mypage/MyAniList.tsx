import React, {useState, useEffect} from 'react'
import MyAniItem from './MyAniItem';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'



const Container = styled.div`
  
`

const CarouselContainer = styled(Carousel)`
  margin-bottom: 1rem;
`

const CarouselPaper = styled(Paper)`
  width: 100%;
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
`

const MyAniContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`

const MyAniTitle = styled.h2`
  margin-left: 1rem;
`

function MyAniList() {

  return (
    <Container>
      <MyAniContainer>
        <MyAniTitle>최근 시청한 작품들</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
          <CarouselPaper elevation={0}>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          {/* <MyAniItem></MyAniItem> */}
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 찜한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
          <CarouselPaper elevation={0}>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          {/* <MyAniItem></MyAniItem> */}
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>

      <MyAniContainer>
        <MyAniTitle>내가 좋아요한 작품 목록</MyAniTitle>
        <CarouselContainer indicators={false}>
          <CarouselPaper elevation={0}>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
            <MyAniItem></MyAniItem>
          </CarouselPaper>
          <CarouselPaper elevation={0}>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          <MyAniItem></MyAniItem>
          {/* <MyAniItem></MyAniItem> */}
          </CarouselPaper>
        </CarouselContainer>
      </MyAniContainer>
    </Container>
  )
}

export default MyAniList;
