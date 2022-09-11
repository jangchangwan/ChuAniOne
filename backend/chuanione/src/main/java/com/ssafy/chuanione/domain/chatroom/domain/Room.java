package com.ssafy.chuanione.domain.chatroom.domain;

//import javax.persistence.Entity;

import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private int id; //방번호
    private String name; //방이름

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member admin; //방장 admin? master? owner?


    //tag 없으면 null 값 저장.
    private String tag1;
    private String tag2;
    private String tag3;
    
    private int max; //최대인원

//    private int count; //현재인원


}
