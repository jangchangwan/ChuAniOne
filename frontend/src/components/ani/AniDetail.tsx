import React, { useEffect, useState, useCallback } from 'react'
import styled from "styled-components"
import Player from 'react-player'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt, DownloadDone, Add } from '@mui/icons-material'
import confetti from 'canvas-confetti'

// components
import Info from './Info'
import Review from './Review'
import SimilarAni from './SimilarAni'
import Talk from './Talk'

// redux
import { useDispatch, useSelector } from 'react-redux'
import store from '../../store'
import initialState from '../../store/Loginslice'
import AniReducerType from '../../store/anislice'
import { getAni, getTaste, postLike, deleteLike, deleteDislike, postDislike, deleteChoice, postChoice } from '../../store/anislice'



const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #333333;
  border-radius: 1rem;
`

const TopBox = styled.div`
  width: 100%;
  height: 38%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #f37b83;
  border-radius: 0.3rem 0.3rem 0 0;
`

const AniInfo = styled.div`
  width: 40%;
  height: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`

const AniName = styled.h1`
  color: white;
  margin-bottom: 0;
`

const ButtonDiv = styled.div`
  display: flex;
`

const IconBtn = styled(IconButton)`
`

const InfoBox = styled.div`
  margin-top: 1.2rem;
`

const InfoDiv = styled.div`
  display: flex;
  align-items: flex-start;
`

const InfoName = styled.p`
  width: 3rem;
  font-size: 1.1rem;
  margin: 0;
  margin-right: 0.5rem;
  color: white;
`

const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoText = styled.p`
  color: white;
  margin: 0;
`


const VideoBox = styled.div`
  overflow: hidden;
  width: 55%;
  border-radius: 3rem;
  margin: 0.5rem;
  margin-right: 1rem;
  border: 1rem inset #f37b83;
`

const ImageBox = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 0.5rem inset #f37b83;
`

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`

const TabBox = styled.div`
  width: 100%;
  height: 47%;
  overflow-y: auto;
  scrollbar-color: #d4aa70 #e4e4e4;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 0.8rem;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid rgba(0, 0, 0, 0.158);
    border-left: 0;
    border-right: 0;
    background-color: #f37b83;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
    box-shadow: inset 0px 0px 3px white;
  }
`

const TabDiv = styled.div`
`

const DetailBox = styled(Box)`
`

interface TabPanelProps {
  children?: React.ReactNode,
  index: number,
  value: number,
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
          {children}
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



function AniDetail() {
  /** data??? images type */
  interface Images {
    option_name: string,
    img_url: string,
    crop_ratio: string,
  }

  /** data type */
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
  
  /** ????????? ?????? */
  const videoAttrs = {
    playing: true,
    muted: true,
    loop: true,
    width: '100%',
    height: 'auto',
  }
  
  const dispatch = useDispatch<typeof store.dispatch>()
  const aniId = useSelector((state: AniReducerType) => (state.ani.aniId))
  const isLogin = useSelector((state: initialState) => (state.login.isLogin))

  /**
    value: ??? ??????
    data: ??????????????? ???????????????
    like: ?????????
    dislike: ?????????
    choice: ???
    release: ?????? ???????????? ??????
  **/
  const [value, setValue] = useState<number>(0)
  const [data, setData] = useState<Data | null>(null)
  const [like, setLike] = useState<boolean>(false)
  const [dislike, setDislike] = useState<boolean>(false)
  const [choice, setChoice] = useState<boolean>(false)
  const [release, setRelease] = useState<string[]>([])

  // ?????????????????? ?????? ????????? ?????????, ?????????, ?????????, ??? ??????????????????
  useEffect(() => {
    loadData()
    loadTaste()
    setValue(0)
  }, [aniId])

  /** ??????????????? ??????????????? ???????????? */
  async function loadData() {
    if (aniId) {
      const resAni = await dispatch(getAni(aniId))
  
      if (resAni.meta.requestStatus === "fulfilled") {
        setData(resAni.payload)
        if (resAni.payload.air_year_quarter)  setRelease(resAni.payload.air_year_quarter.split('|'))
      }
    }
  }

  /** ????????? & ????????? & ??? ???????????? */
  async function loadTaste() {
    if (aniId) {
      const resTaste = await dispatch(getTaste(aniId))
  
      if (resTaste.meta.requestStatus === "fulfilled") {
        setLike(resTaste.payload.like)
        setDislike(resTaste.payload.dislike)
        setChoice(resTaste.payload.choice)
      }
    }
  }



  /** ????????? */
  async function handleLike () {
    if (like && aniId) {
      const res = await dispatch(deleteLike(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setLike(!like)
      }
    } else {
      if (aniId) {
        const res = await dispatch(postLike(aniId))
        if (res.meta.requestStatus === "fulfilled" && res.payload) {
          setLike(!like)
          onClick()
        }
      }
    }
  }

  /** ????????? */
  async function handleDislike () {
    if (dislike && aniId) {
      const res = await dispatch(deleteDislike(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setDislike(!dislike)
      }
    } else {
      if (aniId) {
        const res = await dispatch(postDislike(aniId))
        if (res.meta.requestStatus === "fulfilled" && res.payload) {
          setDislike(!dislike)
        }
      }
    }
  }

  /** ??? */
  async function handleChoice () {
    if (choice && aniId) {
      const res = await dispatch(deleteChoice(aniId))

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        setChoice(!choice)
      }
    } else {
      if (aniId) {
        const res = await dispatch(postChoice(aniId))
        if (res.meta.requestStatus === "fulfilled" && res.payload) {
          setChoice(!choice)
          onClick()
        }
      }
    }
  }

  /** ?????????, ??? ????????? ??? ???????????? */
  const onClick = useCallback(() => {
    confetti({
      origin: {
        x: 0.3,
        y: 0.3
      },
      particleCount: 50,
      spread: 40,
      zIndex: 2000,
    })
  }, [])

  /** ??? ?????? */
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      { data ?
        <TopBox>
          {/* ??????, ?????????, ?????????, ???, ??????, ????????? */}
          <AniInfo>
            <AniName>{data.name}</AniName>
              { isLogin ?
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
              : null }

            {/* ??????, ????????? */}
            <InfoBox>
              { data && data.production ?
                <InfoDiv>
                  <InfoName>??????</InfoName>
                  <InfoText>{data.production}</InfoText>
                </InfoDiv>
              : null }
              { release ? (
                <InfoDiv>
                  <InfoName>??????</InfoName>
                  <InfoTextBox>
                    { release.map((item, idx) => (
                      <InfoText key={idx}>{item}</InfoText>
                    ))}
                  </InfoTextBox>
                </InfoDiv>
              ): null}
            </InfoBox>
          </AniInfo>
          
          {/* ????????? | ????????? */}
          { data.highlight_video.dash_url ? 
            <VideoBox>
              <Player url={data.highlight_video.dash_url} {...videoAttrs}/>
            </VideoBox>
          : 
            <ImageBox>
              <Image src={data.images[0].img_url}/>
            </ImageBox>
          }
        </TopBox>
        : null
      }

      {/* ??? */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          textColor='inherit'
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#06113C',
            },
          }}
          style={{ color: '#06113C' }}
        >
          <Tab label="????????????" {...a11yProps(0)} />
          <Tab label="??????" {...a11yProps(1)} />
          <Tab label="????????? ??????" {...a11yProps(2)} />
          <Tab label="??????" {...a11yProps(3)} />
        </Tabs>
      </Box>

      { data ?
        <TabBox>
          <TabPanel value={value} index={0}>
            <Info data={data}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Review aniId={data.ani_id}/>
          </TabPanel >
          <TabPanel value={value} index={2}>
            <SimilarAni aniId={data.ani_id}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Talk aniId={data.ani_id}/>
          </TabPanel>
        </TabBox>
      : null }
    </Container>
  )
}

export default AniDetail
