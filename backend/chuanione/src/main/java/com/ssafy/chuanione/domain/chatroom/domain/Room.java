package com.ssafy.chuanione.domain.chatroom.domain;

//import javax.persistence.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private Long id; //방번호
    private String name; //방이름

//    @ManyToMany
//    @JoinColumn(name = "member_id")
//    private String admin; //방장 admin? master? owner?

    @Builder
    public Room(String name) {
        this.name = name;
    }


    public static Room createRoom(String name) {
        return Room.builder().name(name).build();
    }


}
