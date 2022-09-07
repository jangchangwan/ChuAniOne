package com.ssafy.chuanione.domain.chatroom.domain;


import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
public class JoinUser {

    @Column(name="room_id")
    private Room room_id; //방번호

    @Column(name="member_id")
    private Member member_id; //회원번호

}
