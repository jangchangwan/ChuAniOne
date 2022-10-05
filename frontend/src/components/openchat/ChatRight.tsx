import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'

const Container = styled.div`
  width: calc(38% - 6rem);
  height: 85%;
  padding: 0;
  margin: 7.5% 3rem;
  background-color: #FCE2DB;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 2;
`

/** 열린 채팅방 */
function ChatRight({ opened, openedId, handleClosed }: any) {
  
  return (
    <>
      { opened ?
        <Container>
          <ChatHeader 
            openedId={openedId} 
            handleClosed={handleClosed}
          />
          <ChatBody
            openedId={openedId} 
          />
        </Container>
      : 
        null
      }
    </>
  )
}

export default ChatRight
