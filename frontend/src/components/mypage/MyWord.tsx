import React, {useState, useEffect} from 'react'
import MyWordItem from './MyWordItem';
import { useDispatch } from 'react-redux'
import { getMyvoca } from '../../store/mypageslice'
import store from '../../store'
import styled from 'styled-components'

const MyVocaContainer = styled.div`
  width: 100%;  
  height: 100%;
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
const MyVocaList = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.2rem;

`


function MyWord() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const [myVocaList, setMyVocaList] = useState<any>([])

    // 데이터 불러오기
    async function loadWordData() {
      const MyVoca = await dispatch(getMyvoca())
      setMyVocaList(MyVoca.payload.myVoca)
    }
  
    useEffect(() => {
      loadWordData()
    },[])
  
  return (
    <MyVocaContainer>
      <MyVocaList>
      {
        myVocaList ?
        (
          myVocaList.map((item, idx) => (
            <MyWordItem key={idx} wordData={item}/>
          ))
        )
        : null
      }
      </MyVocaList>
    </MyVocaContainer>
  );
}

export default MyWord;
