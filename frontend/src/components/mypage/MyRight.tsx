import React, { useState } from 'react'
import styled from "styled-components"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import MyAni from './MyAni'
import MyReview from './MyReview'
import MyWord from './MyWord'
import MyGoal from './MyGoal'


const TabBox = styled.div`
  width: 100%;
  height: 42%;
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
  );
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


function MyRight() {

  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <h1>MyRight</h1>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant='fullWidth'>
          <Tab label="애니메이션" {...a11yProps(0)} />
          <Tab label="리뷰" {...a11yProps(1)} />
          <Tab label="단어" {...a11yProps(2)} />
          <Tab label="도전과제" {...a11yProps(3)} />
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

    </div>
  );
}

export default MyRight;
