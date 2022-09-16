package com.ssafy.chuanione.domain.chatroom.domain;


import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
@Table(name = "member_room")
public class JoinUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room_id; //방번호

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member_id; //회원번호

}
