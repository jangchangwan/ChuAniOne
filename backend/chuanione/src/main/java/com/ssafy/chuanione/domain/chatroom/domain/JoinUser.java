package com.ssafy.chuanione.domain.chatroom.domain;


import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
public class JoinUser {

    @Id
    @GeneratedValue
    @Column(name="member_room_id")
    private Long id;

    @Column(name="room_id")
    private Room room_id; //방번호

    @Column(name="member_id")
    private Member member_id; //회원번호

}
