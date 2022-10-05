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
  z-index: 2;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TabBox = styled.div`
  width: 100%;
  height: 92%;
`

const TabDiv = styled.div`
  width: 100%;
  height: 98%;
  z-index: 999;
`

const DetailBox = styled(Box)`
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
        <DetailBox>{children}</DetailBox>
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

/** 채팅방 목록, 방 만들기 */
function ChatLeft ({ handleOpened }: any) {
  // 탭
  const [value, setValue] = useState<number>(0)

  /** 탭 변경 */
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Tabs 
        value={value} 
        onChange={handleChange}
        textColor='inherit'
        TabIndicatorProps={{
          sx: {
            backgroundColor: '#06113C',
          },
        }}
        style={{ color: '#06113C', width: '70%' }}
        variant="fullWidth"
      >
        <Tab label="전체 오픈채팅" {...a11yProps(0)} />
        <Tab label="내 채팅목록" {...a11yProps(1)} />
        <Tab label="방 만들기" {...a11yProps(2)} />
      </Tabs>

      <TabBox>
        <TabPanel value={value} index={0}>
          <ChatTotal />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyChat handleOpened={handleOpened}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MakeChat />
        </TabPanel>
      </TabBox>

    </Container>
  )
}

export default ChatLeft
