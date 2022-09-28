import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  width: 90%;
  height: 95%;
  padding: 2.5% 5%;
`


const Title = styled.h2`
`

const Content = styled.span`
`

const ContentBold = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`

const Genres = styled.div`
  margin: 1rem 0;
`

const Genre = styled.span`
  color: white;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #f37b83;
  margin-right: 0.5rem;
`

function Info({ data }: any) {
  return (
    <Container>
      <Content>{ data.content_rating }</Content>
      <Genres>
        { data.genres.map((genre: string, idx: number) => (
          <Genre>{genre}</Genre>
        ))}
      </Genres>
      <Title>줄거리</Title>
      <Content>{data.content}</Content>
    </Container>
  )
}

export default Info
