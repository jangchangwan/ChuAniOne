import React, { useState } from 'react'
import './Main.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import axios from "axios"
import styled from "styled-components"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ContentPasteSearchOutlined } from '@mui/icons-material'

const CarouselPaper = styled(Paper)`
  width: 100%;
`

const CarouselImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

const CarouselImgIn = styled.img`
    position: absolute;
    left: 3.125em;
    bottom: 11em;
    max-width: 38.75em;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    box-sizing: inherit;
    display: block;
`

const RecommendImg = styled.img`
  width: auto;
  object-fit: cover;

  &+& {
    margin: 1rem;
  }
`

function Main() {
  const [recommendImg, setRecommendImg] = useState<string>('')
  const [recommendName, setRecommendName] = useState<string>('')

  async function getAni(): Promise<void> {
    const ani = await axios.get('https://laftel.net/api/items/v2/40815/')
    await setRecommendImg(ani.data.img)
    await setRecommendName(ani.data.name)
    console.log(ani)
  }

  getAni()

  const carouselImg: string[] = [
    "https://image.laftel.net/carousel/carousel_hero_linkclick_w.jpg?Expires=1662364266&Signature=innFnb~9SdcBX25y0PWhzjaONO~f-1lZVyomRikJYzxul8wQ22cj5njbmggI9c8hjv4yTNq~x7Fd1WN7162vNFr9x-pJQedTsxUUGo7OlIELeQhQvxsZU-zAEiCbIzBGWK4TYo4Dpm0fiIpY3gBZy9PywfrsWqIHykh5fpzEIhzJSAoZn~3~GXhbmOWfB0XHzgd-2wB4v4inIvMRLjLFWFETKtM~3XnX5a7wvWs0J7E1lXGiCZTyngCLJeu8mFJAXJhMANFsEYK-VPPXEQ9EgQTm3yxN2KQZqRh-2-ngrhn0QVOOi5kp7ZUwmQ0BFM3V~Uz2aNGyaYDcsaBeGW8cBg__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_hero_cuckooscouple_w.jpg?Expires=1662364267&Signature=KkqzyCzmMhP0a2GvoUvbDJCM8pDu-YAeWOoV7E7o1thi3LpIr391-M4gx5Pc-CD5rmTNssvDlyYU5QUwGwRDEB0fK7Hu9gvabNKn3mGLBjLtZ6tuAMQchsvKqDjhKZ0807lPS0VLq1LszLghgWUDcu08Sk2z3Mws67W6W5XxTYzxNPHU74qmZKCIiryA01ftZ8AmrudPfehRVw~zCeQAZJBgG-gSGHwbSAZPsmPXyosN3ZGsDM2joTntm5MY91FyN5vzO1u0x51QSAwEeyNton5RejKrJJ9B09rEhrSkrRx5~GAU9ZnAD5Xp1~iRyTy-9m75fVUDkOwLOtsHuYsKUw__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_hero_aria_w.jpg?Expires=1662364267&Signature=F346dJ8RbWuavoEwb3RcVvdk1GeRtLEJWXF0LA5b8Iv0e~1GuQPlN-6jjSgL442xMcIelbDYsNioT-NVLSDIm0yQxsikew30KWJ2FWB3g0yibDDhbfjLSkJG1ylSH-h39NOKc3DtNecx2JZ8~1bukvvK0PL5pZCsqhaLUVZt~uyVfOVkkOzIECVZvYF2MP~OV97RggAjJqw4FrvzXiM6qfKjaOX8dw5U5uECorlX4y2g9BOImbLjW4lzQLbljnG0mXqX0v~ZbzOW2~V4lvPaoUIU8jw0oNzcdnuyTtvkl02s1v1XXifKdGZFO32dukIJ9Tyh2GP0anQDiVRew-03~g__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_hero_gintama_finalchapter_w.jpg?Expires=1662364267&Signature=hw0ls~CWyKa2tjEfzEeWT5bKGuDSgOHBXQ-S2iRsCTeFm2BK0oFzR8TTSG3G~0RDWZaAxT0JmR2yUFuEMuEYr4j~Ck7fCAve5f~7UxTI5ugGdR85FbNwqNUTPlWvumDYQbvpO1TZ0miWIaSlr10vl23fhMP-ekUGnCuB-8OCBGRJNOMf28JuoQb6RjO3WmkVeATg0bLAdLC5QkxDqf32AHJNOKxIz11nxb07vPTq3NBgZ8RB7Ye1GubjlmqjPuXkk7NJ8s41GY5E-4PAvxjYbI5cM3qUR2kwrgVmdqJ4OPdmWKYL6VNW0QqRP2MFAUoO7Fl4C--SIaza5CyWIb5rwQ__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_hero_RWBY_w.jpg?Expires=1662364267&Signature=dBR0MlV4yq6WAtRbHiXQ3Ax4HFjR-mmEiJCD5I2qe2MGyQ4iBu7rQ1xu2Eh9UN8eYgtjHjgUxgtkuEeIpzuKBi7yaqklUJ3xzR1YGQ1g4mtJU66Y4tsjaotbp1N4JGiZwPPbG7KMoTjOmnv0181HQYu6~W-EbD1W14JKQ1eHLNUAnEPG~XoH0YQs3TV7keeHnnMOxIHz5eV3jjQ7tnkzSlLOQ16w6mPg1w2YP5ZtxFzECBtAjgApY94gxQq3AaNueDSIBE9n4BCh6OHeBigHDm-pFsUo7x8nqZOh4MA8AP8P22FbLIQ0JZPbgeiLFQiRcC8Dt5GUJiHH~CSF3TEOMw__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_hero_sweet_w.jpg?Expires=1662364267&Signature=BCaYPv1hx1C8PfzS-ZLRTyUbvMQPssovHs6wZZ8kA9ATIMazstLEHw3jWLDN0KH1SgE74IYQW3ZPxZh8KE0OrWvqvTRV3ETfJ6R6dEpVLLq~VDBOHCiCh45OW9FEj3WOnKrcLvtdLspNIlVgbYzHNC~J0XcVhIhpuT-cTDnNEURBpBOA8xK6kCNOWvkSjvzrnkO~52Bm7r2R2zUtX1HvwPVgFpXHyZ49~U7nzSroaPjzwdT-dgxtYCnUDZgofjQrSNzytNxV2H-0sul3PCTXRzKc-C1vI8CViCinxebDkWfdzrKSfgDn216nV~fAg-8FIGkaVuzeNejHX1-0tygd6g__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A"
  ]

  const carouselImgIn: string[] = [
    "https://image.laftel.net/carousel/carousel_logo_linkclick_1.png?Expires=1662364266&Signature=OY9bfoFknc~eF2H053ol9eKkQZ9CnWIDHvAtMEJSjge1vdaGtfGqLlFpUCqMBZDTNT-~uRsVWW6RPCZjzXEFj32Rukt575W9T4cC~v8O49mh2Q2dmbtUne4ZdHkMGtjwBvSvVeHG601ZWVjryJew4fHqli2cfZ9ONEkbxNbxeCqJRYGIFynGzIw6IEUPbOKUetCKbmDn6XeBYtNGVT5Rk~2CQnjEKTj2FRoMicbEvGRZtqEg3x1HM68GdSJLXJH8OGC-Kt~U5qH8bcmqRu5q~OmKmWfsQe-0JeR7l1--dyBipScf4jHZILU8Tw1Lq5S2YSK2nkFIIpScJ~RhALVSAg__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_logo_cuckoocouple.png?Expires=1662364267&Signature=f3vxJPsZ-9xSIkS6CZOjgLUJV2WXLKH4DyiZ7PbHOwMnEOAuLhHoCM8om66VwKxZfbSRVu08Mt~rcGxiW1JDuXcgXg0m5BYTYhqF1~i~xwj2kmEK8kzrypZVw8HXoRGUOCjLWJ~89C5WzW4IvunqyXLU2iL5E2xPiDVcYeprIzLx43PXkHAcARchB8qblK6mpf8SkPcPQZ4ILhxOnWDbr2OI9otQOdO-uZqw71DkuUzGUOmGFvDk5EgzQ2ybDbb6z5hLAe0kjCZTc8hXHi83P-HU1DOukkpStGtLtUhLsZNgFIZhy3BRaaEMCIlqlQryTBQm9g76D4gQ1SNhqlhsdg__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_logo_aria.png?Expires=1662364267&Signature=WtnhKcnD6daueu4SMDQFGn4s2VTPhLdqTMXmqW3GJ85Eli4O0Nu4M4i6IPQ3vKrBl2tBAoWgF3S-EhkZc7PGH4s~Bngb2GKs~kPDbrPE61gFbRoBRHnEPGr2nDgdtBMt9DnvgOkBG5aq4cDqf0fm4uBVcFRpbleRK7id3PEn2lMUd2coojK-if4hgFpCSSP2GMzx2e1rGmmq4UTLltaTN5Ed703VreKsVYackLW-O9Vww0u3ci7a7l~JaQMAKOg76-ElQn9uyOJA4kT65FQZkhQuKX1U9nGPp3q4mQahJwlzgK3gkXz0TpooxHm3r9LxjBbTL6YPrQ7JVpIHIZc1iQ__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_logo_gintama_finalchapter_1.png?Expires=1662364267&Signature=DI5b1nySfW5XKmeKumfnTEBCQemXYZr5VhNAPiUngQoyKily7FZx~lv6E9DVvRS9z8mF07cUkEAvB3FYZFx7Es3PPwLg0HZv3a7ywjdpzna7~KhqAZuaeeIo5ZCgYbRJGJ~AlQQXepqRLKOIbCDFaoXzWjTJAagS2xMJ9TMV2gZVI9iLgmBl7We2LPRnBhPtcfaB7s5GiKY9awoydVa5l9QAmG7wyUCUb2vdGnSs4BNBnMUHyA1VZtF1GeO~PqtGu4uWOj1HbUp4km~Ki~lTcHI4~CxDN~8ssLQej6HMzA~0~B8-8uj-eF3Pq4Tf2CyDWSTM1kLZu0CrKr0poy5lNw__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_logo_RWBY.png?Expires=1662364267&Signature=NW~QMz5qztF6C6Km-SS8fu9mEszwgHfI4Pbsb07ZgHkhaj9YB2R8P6rEn7wDVv9saMDvYqQ6YlwWTKV6B-VNyK4BNEq69~SWnPCkptugTSOnZMDt4BKlkGviaDRi83BE7FB5zJsCefKY1SEY3vLblUlHKM2mDOZG8PRnsvZYpjv4JDa~DjpPWw0mKjI-bWNoaLhTDp5IpuR5N2cE8dSKtuPKgEdxbPi08KeIcJr1do9dsiDnaZvWkmQri87LrYpneu-CniEJEPehdfY6Qc6zNDrVM7JmQvDtGp9HoN~qwnVXHfyocXxr1Eo5mAxfldXAPBZZpYFgbYLXGGz59FFfAw__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
    "https://image.laftel.net/carousel/carousel_logo_sweet.png?Expires=1662364267&Signature=ZUVPs8A9zbEwd4~ds9FyMkXNRbuLTVvfO~N7dU0BttWHj08nHMX1BxnBnkRax1usY9vlb1jPWs6rTrVm2b4whNjd3LvpzrG1aNjw5RVguuS1E7cBUUmfKrFHHdjxC~UMH81rIflZ~vlxJyIfNOAje6lFyCoZMTs016PiS5yC-pUWJRSafAeA~ZCT7tLk8PYdmwCeZ1JGtrKHHUDoXqg~WK0FHuTO14MyTloDcIDMjXIXBecBhJiZd4FQ6jiDNR0mtviJctbKDRf64yCHJHTnnqbqaLcVizYt1zXZWaHU34WKT5ARI3LyErUxUIogdJHW4DPgkDrlA5SfDw9aQRQdyg__&Key-Pair-Id=APKAJMMAKL567BYWKQ5A",
  ]



  return (
    <div>
      <h1>main</h1>
      <Carousel>
        { carouselImg.map((item: string, idx: number) => (
          <CarouselPaper elevation={0}>
            <CarouselImg src={item}/>
            <CarouselImgIn src={carouselImgIn[idx]} className="inImage"/>
          </CarouselPaper>
        ))}
      </Carousel>

      <Carousel indicators={false}>
        <CarouselPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
          </Box>
        </CarouselPaper>
        <CarouselPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
          </Box>
        </CarouselPaper>
        <CarouselPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
            <RecommendImg src={recommendImg}/>
          </Box>
        </CarouselPaper>
      </Carousel>
    </div>
  )
}

export default Main;
