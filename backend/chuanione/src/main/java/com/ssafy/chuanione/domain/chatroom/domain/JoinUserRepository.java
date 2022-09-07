package com.ssafy.chuanione.domain.chatroom.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Column;

public interface JoinUserRepository extends JpaRepository<JoinUser, Long> {

    //방마다 참가자수
    int countDistinctBy(int room_id);

    //참가자 삭제


    //참가자 추가

}
