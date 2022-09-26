import React from 'react'
import styled from "styled-components"
import Container from '@mui/material/Container'
import MyGoalItem from './MyGoalItem';

// 과제 1개 세트
const GoalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

function MyGoalList() {
  return (
    <Container>
      <MyGoalItem></MyGoalItem>
      <MyGoalItem></MyGoalItem>
    </Container>
  );
}

export default MyGoalList;
