import React, { useState } from 'react'
import styled from 'styled-components'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ChatTotal from './ChatTotal'
import MyChat from './MyChat'
import MakeChat from './MakeChat'

const Container = styled.div`
  width: 38%;
  height: 85%;
  padding: 1rem 2rem;
  /* background-color: gray; */
`

const TabBox = styled.div`
  width: 100%;
  height: 92%;
  /* background-color: aqua; */
`

const TabDiv = styled.div`
  width: 100%;
  height: 98%;
  z-index: 999;
`

const DetailBox = styled(Box)`
  /* padding: 0.5rem; */
  width: 100%;
  height: 100%;
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


function ChatLeft ({ opened, openedId,  handleOpened, handleClosed }: any) {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
        <Tab label="전체 오픈채팅" {...a11yProps(0)} />
        <Tab label="내 채팅목록" {...a11yProps(1)} />
        <Tab label="방 만들기" {...a11yProps(2)} />
      </Tabs>

      <TabBox>
        <TabPanel value={value} index={0}>
          <ChatTotal />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyChat 
            opened={opened}
            openedId={openedId}
            handleOpened={handleOpened}
            handleClosed={handleClosed}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MakeChat />
        </TabPanel>
      </TabBox>

    </Container>
  )
}

export default ChatLeft
