import React from 'react'
import styled from "styled-components"
import badgeicon1 from '../../assets/images/google_icon.png' // 임시로 사진 가져옴


// 도전과제 1개 세트
const GoalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`

const BadgeBox = styled.div`
  width: 15%;
`

// 벳지 이미지
const BadgeImg = styled.img`
  /* width: 2.5rem; */
  width: 2rem;
  height: 2rem;
  /* display: flex; */
  /* justify-content: center;  */
  /* align-items: center; */
  /* margin: 0; */
  /* margin: 1rem; */
  filter: drop-shadow(5px 5px 5px #000); // 배경 짤라야 온전하게 그림자 적용 가능
`

// 텍스트
const GoalBox = styled.div`
  width: 70%;
`

// 성공여부 (체크 표시를 하거나 성공하면 회색으로 전체 칸이 변하거나 등 논의 필요)
const GoalClear = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
`


function MyGoalItem() {
  return (
    <GoalContainer>
      <BadgeBox>
      <BadgeImg src={badgeicon1}></BadgeImg></BadgeBox>
      <GoalBox>도쿄 리벤저스 보기</GoalBox>
      <GoalClear>클리어</GoalClear>
    </GoalContainer>
  );
}

export default MyGoalItem;
