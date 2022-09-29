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
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int id; //방번호
    private String name; //방이름

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member admin; //방장 admin? master? owner?

    //tag 없으면 null 값 저장.
    private String tag1;
    private String tag2;
    private String tag3;
    
    private int max; //최대인원

    private int count; //현재인원


    // onetomany list<chat> ?


    public void patch(Room room){
        if(room.name != null) this.name = room.name;
        if(room.tag1 != null) this.tag1=room.tag1;
        if(room.tag2 != null) this.tag2=room.tag2;
        if(room.tag3 != null) this.tag3=room.tag3;
        if(room.max != 0) this.max=room.max;
    }


}
