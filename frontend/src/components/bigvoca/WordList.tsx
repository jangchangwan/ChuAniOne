import React, {useEffect, useState} from 'react';
import WordItem from './WordItem';
// import { getVocaList } from '../../store/bigvocaslice'
// import { useDispatch } from "react-redux"
// import store from '../../store'

function WordList() {
  // const dispatch = useDispatch<typeof store.dispatch>()
  // const [vocaList, setVocaList] = useState('')

  // useEffect(() => {
  //   dispatch(getVocaList())
  //     .then((res:any) =>{
  //       console.log(res.payload)
  //       setVocaList(res.payload)
  //     })
  // }, [])
  return (
    <div>
      <h1>애니 단어장</h1>
      {/* <p>{vocaList}</p> */}
      <WordItem></WordItem>
      <WordItem></WordItem>
      <WordItem></WordItem>
      <WordItem></WordItem>
    </div>
  );
}

export default WordList;
