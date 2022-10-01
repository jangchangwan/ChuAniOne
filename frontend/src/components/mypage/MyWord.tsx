import React, {useState, useEffect} from 'react'
import MyWordItem from './MyWordItem';
import { useDispatch } from 'react-redux'
import { getMyvoca } from '../../store/mypageslice'
import store from '../../store'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'

const MyVocaContainer = styled.div`
  width: 100%;  
  height: 100vh;

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
      <Grid container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
      >
      {
        myVocaList ?
        (
          myVocaList.map((item, idx) => (
            <Grid item xs={6}><MyWordItem key={idx} wordData={item}/></Grid>
            
          ))
        )
        : null
      }
      </Grid>
    </MyVocaContainer>
  );
}

export default MyWord;
