import React, {useEffect} from 'react'

// styled Component
import styled from "styled-components"

// image
import likeIcon from '../../assets/images/like.png'
import wish from '../../assets/images/wish.png'
import review1 from '../../assets/images/review1.png'
import review3 from '../../assets/images/review3.png'
import talktalk1 from '../../assets/images/talktalk1.png'
import talktalk3 from '../../assets/images/talktalk3.png'

// 도전과제 1개 세트
const GoalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`

// 뱃지 박스
const BadgeBox = styled.div`
  width: 15%;
`

// 벳지 이미지
const BadgeImg = styled.img`
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(1px 1px 1px #000); // 배경 짤라야 온전하게 그림자 적용 가능
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

/** 도전과제 Item Component */
function MyGoalItem(challengeData:any) {
  return (
    <GoalContainer>
      <BadgeBox>
      {
        challengeData.challengeData === '리뷰 작성 완료' ?
        <BadgeImg src={review1}></BadgeImg>
        : null
      }
      {
        challengeData.challengeData === '리뷰 3개 작성 완료' ?
        <BadgeImg src={review3}></BadgeImg>
        : null
      }
      {
        challengeData.challengeData === '톡톡 작성 완료' ?
        <BadgeImg src={talktalk1}></BadgeImg>
        : null
      }
      {
        challengeData.challengeData === '애니메이션 좋아요 완료' ?
        <BadgeImg src={likeIcon}></BadgeImg>
        : null
      }
      {
        challengeData.challengeData === '애니메이션 찜하기 완료' ?
        <BadgeImg src={wish}></BadgeImg>
        : null
      }
      {
        challengeData.challengeData === '톡톡 3개 작성 완료' ?
        <BadgeImg src={talktalk3}></BadgeImg>
        : null
      }
      </BadgeBox>
      <GoalBox>{challengeData.challengeData}</GoalBox>
      <GoalClear>클리어</GoalClear>
    </GoalContainer>
  )
}

export default MyGoalItem
