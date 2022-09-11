package com.ssafy.chuanione.domain.chatroom.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Column;

public interface JoinUserRepository extends JpaRepository<JoinUser, Long> {

    //방마다 참가자수
//    @Query("SELECT COUNT(*) FROM ")
//    joinUser 테이블에서 room_id로 group by 한 count 값
    int countDistinctBy(int room_id);

    //참가자 삭제
    //room_id 와 member_id 조건걸어야함
    void deleteById(int id);


    //참가자 추가 -> save로 된다. 기본제공인가?


    //참가자 조회!!!!!!!!
//    List<Member>

}
