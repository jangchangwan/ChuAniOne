import React from 'react'
import MyWordList from './MyWordList';
import styled from 'styled-components';

// const WordBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `

function MyWord() {
  return (
    <div>
      {/* <WordBox> */}
      <h1>MyWord</h1>
      <MyWordList></MyWordList>
      <MyWordList></MyWordList>
      <MyWordList></MyWordList>
      <MyWordList></MyWordList>
      {/* </WordBox> */}
    </div>
  );
}

export default MyWord;
