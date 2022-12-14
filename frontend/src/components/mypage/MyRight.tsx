import React, { useState } from 'react'

// styled Conponent
import styled from "styled-components"

// MUI
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

// 하위컴포넌트
import MyAni from './MyAni'
import MyReview from './MyReview'
import MyWord from './MyWord'
import MyGoal from './MyGoal'


const RightContainer = styled.div`
  background-color: #FFF5E4;
  padding: 2rem;
  margin-top: 3rem;
  width: 100%;
  height: 85%;
  border: 0.5rem solid #967E76;
  border-radius: 1rem;
`

const TabBox = styled.div`
  width: 100%;
  height: 80%;
`

const TabDiv = styled.div`
  width: 100%;
  height: 70vh;
`

const DetailBox = styled(Box)`
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background-color: #967E76;
    height: 30%;
    box-shadow: inset 0px 0px 3px white;
  }

  ::-webkit-scrollbar-track {
    background-color: #c7b5b0;
    box-shadow: inset 0px 0px 3px white;
  }
`

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

/** 탭 판넬 */
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



function MyRight() {

  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <RightContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          textColor="inherit" 
          indicatorColor="secondary" 
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#967E76',
            },
          }}
          variant='fullWidth'
          style={{ color: '#967E76' }}
        >
          <Tab label="애니메이션" {...a11yProps(0)} sx={{ fontSize:'1.5rem'}}/>
          <Tab label="리뷰" {...a11yProps(1)} sx={{ fontSize:'1.5rem'}}/>
          <Tab label="단어" {...a11yProps(2)} sx={{ fontSize:'1.5rem'}}/>
          <Tab label="도전과제" {...a11yProps(3)} sx={{ fontSize:'1.5rem'}}/>
        </Tabs>
      </Box>

      <TabBox>
        <TabPanel value={value} index={0}>
          <MyAni></MyAni>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyReview></MyReview>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyWord></MyWord>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MyGoal></MyGoal>
        </TabPanel>
      </TabBox>

    </RightContainer>
  )
}

export default MyRight
