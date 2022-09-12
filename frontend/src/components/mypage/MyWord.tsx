import React from 'react'
import MyWordItem from './MyWordItem';
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
      <MyWordItem></MyWordItem>
      <MyWordItem></MyWordItem>
      <MyWordItem></MyWordItem>
      <MyWordItem></MyWordItem>
      {/* </WordBox> */}
    </div>
  );
}

export default MyWord;
