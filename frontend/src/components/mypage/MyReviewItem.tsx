import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { getAni } from '../../store/anislice'


const Container = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  width: 95%;
  padding: 2.5%;
  height: auto;
  background-color: #fff0f0;
`

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const AniName = styled.h3` 
  margin: 0;
`

const ReviewText = styled.p`
  margin: 0;
`


function MyPageItem(review:any) {

  interface Images {
    option_name: string,
    img_url: string,
    crop_ratio: string,
  }

  interface Data extends Images {
    air_year_quarter: string,
    ani_id: number,
    author: string[],
    avg_rating: number,
    content: string,
    content_rating: string,
    genres: string[],
    highlight_video: {
      dash_url: string,
    },
    images: Images[],
    img: string,
    name: string,
    production: string,
    related: number[],
    _adult: boolean,
    _ending: boolean,
    _id: string,
  }
  const dispatch = useDispatch<typeof store.dispatch>()
  const [data, setData] = useState<Data>()
  async function loadData() {
    const resAni = await dispatch(getAni(review.reviewData.animation))
    // console.log(resAni)
    if (resAni.meta.requestStatus === "fulfilled") {
      setData(resAni.payload)
    }
  }

  useEffect(() =>{
    loadData()
  },[])
  return (
    <Container>
      <ReviewBox>
        {
          data ?
          <AniName>{data.name}</AniName>
          : null
        }
        
      </ReviewBox>
      <ReviewText>
        {review.reviewData.content}
      </ReviewText>
    </Container>
  );

}

export default MyPageItem;
