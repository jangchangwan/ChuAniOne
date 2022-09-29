import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Player from 'react-player'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt, DownloadDone, Add, RestartAlt } from '@mui/icons-material'

import Info from './Info'
import Review from './Review'
import SimilarAni from './SimilarAni'
import Talk from './Talk'
// import Books from './Books'

// redux
import { useDispatch } from 'react-redux'
import store from '../../store'
import { getAni, getTaste, postLike, deleteLike, deleteDislike, postDislike, deleteChoice, postChoice } from '../../store/anislice'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TopBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  padding: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #f37b83;
  border-radius: 0.3rem 0.3rem 0 0;
`

const AniInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AniName = styled.h1`
  color: white;
`

const ButtonDiv = styled.div`
  display: flex;
  /* justify-content: center; */
`

const IconBtn = styled(IconButton)`
  
`

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
`

const InfoName = styled.p`
  font-size: 1.1rem;
  margin: 0;
  margin-right: 0.5rem;
  color: white;
`

const InfoText = styled.p`
  color: white;
  margin: 0;
`


const VideoBox = styled.div`
  overflow: hidden;
  width: 50%;
  border-radius: 3rem;
  margin: 0.5rem;
  border: 1rem inset #f37b83;
`

const TabBox = styled.div`
  width: 100%;
  height: 45%;
  /* background-color: aqua; */
  overflow-y: auto;

  ::-webkit-scrollbar {
    /* background-color: ; */
    width: 0.5rem;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background-color: #f37b83;
    height: 30%;
    box-shadow: inset 0px 0px 3px white;
  }

  ::-webkit-scrollbar-track {
    background-color: #ffcdce;
    box-shadow: inset 0px 0px 3px white;
  }
`

const TabDiv = styled.div`
`

const DetailBox = styled(Box)`
  /* padding: 0.5rem;
  width: 100%;
  height: 100%; */
`

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabDiv
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <DetailBox>
          <Typography>{children}</Typography>
        </DetailBox>
      )}
    </TabDiv>
  )
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}




function AniDetail({ aniId }: any): any {
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
  
  const videoAttrs = {
    playing: true,
    muted: true,
    loop: true,
    width: '100%',
    height: 'auto',
  }
  
  const dispatch = useDispatch<typeof store.dispatch>()

  const [value, setValue] = useState<number>(0)
  const [data, setData] = useState<Data | null>(null)
  const [like, setLike] = useState<boolean>(false)
  const [dislike, setDislike] = useState<boolean>(false)
  const [choice, setChoice] = useState<boolean>(false)

  useEffect(() => {
    loadData()
    loadTaste()
  }, [aniId])

  async function loadData() {
    const resAni = await dispatch(getAni(aniId))

    if (resAni.meta.requestStatus === "fulfilled") {
      setData(resAni.payload)
    }
  }

  // 좋아요 & 싫어요 & 찜 불러오기
  async function loadTaste() {
    const resTaste = await dispatch(getTaste(aniId))

    if (resTaste.meta.requestStatus === "fulfilled") {
      setLike(resTaste.payload.like)
      setDislike(resTaste.payload.dislike)
      setChoice(resTaste.payload.choice)
    }
  }



  // 좋아요
  async function handleLike () {
    if (like) {
      const res = await dispatch(deleteLike(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setLike(!like)
      }
    } else {
      const res = await dispatch(postLike(aniId))
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setLike(!like)
      }
    }
  }

  // 싫어요
  async function handleDislike () {
    if (dislike) {
      const res = await dispatch(deleteDislike(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setDislike(!dislike)
      }
    } else {
      const res = await dispatch(postDislike(aniId))
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setDislike(!dislike)
      }
    }
  }

  // 찜
  async function handleChoice () {
    if (choice) {
      const res = await dispatch(deleteChoice(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setChoice(!choice)
      }
    } else {
      const res = await dispatch(postChoice(aniId))
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setChoice(!choice)
      }
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      { data ?
        <TopBox>
          <AniInfo>
            <AniName>{data.name}</AniName>

              <ButtonDiv>
                <IconBtn onClick={handleLike}>
                  { like ? <ThumbUpAlt /> : <ThumbUpOffAlt /> }
                </IconBtn>
                <IconBtn onClick={handleDislike}>
                  { dislike ?  <ThumbDownAlt /> : <ThumbDownOffAlt /> }
                </IconBtn>
                <IconBtn onClick={handleChoice}>
                  { choice ? <DownloadDone/ > : <Add /> }
                </IconBtn>
              </ButtonDiv>

            <InfoDiv>
              <InfoName>제작</InfoName>
              <InfoText>{data.production}</InfoText>
            </InfoDiv>
            <InfoDiv>
              <InfoName>출시</InfoName>
              <InfoText>{data.air_year_quarter}</InfoText>
            </InfoDiv>
          </AniInfo>
          <VideoBox>
            <Player url={data.highlight_video.dash_url} {...videoAttrs}/>
          </VideoBox>
        </TopBox>

        : null
      }
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
          <Tab label="상세정보" {...a11yProps(0)} />
          <Tab label="리뷰" {...a11yProps(1)} />
          <Tab label="비슷한 작품" {...a11yProps(2)} />
          <Tab label="톡톡" {...a11yProps(3)} />
          {/* <Tab label="도서" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>

      { data ?
        <TabBox>
          <TabPanel value={value} index={0}>
            <Info data={data}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Review aniId={data.ani_id}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SimilarAni aniId={data.ani_id}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Talk aniId={data.ani_id}/>
          </TabPanel>
          {/* <TabPanel value={value} index={4}>
            <Books />
          </TabPanel>  */}
        </TabBox>
      : null }
    </Container>
  )
}

export default AniDetail
