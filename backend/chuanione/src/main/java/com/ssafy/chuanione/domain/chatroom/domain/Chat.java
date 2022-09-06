package com.ssafy.chuanione.domain.chatroom.domain;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name="chat")
@ToString
public class Chat {

    @Id
    @GeneratedValue
    @Column(name="chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;

    private String sender;

    @Column(columnDefinition = "TEXT")
    private String message;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime sendData;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="member_id", nullable=false, updatable=false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @NotNull
//    private Member member;

    @Builder
    public Chat(Room room, String sender, String message){
        this.room=room;
        this.sender=sender;
        this.message=message;
        this.sendData = LocalDateTime.now();
    }


    /**채팅 생성
     * @param room 채팅 방
     * @param sender 보낸이
     * */

    public static Chat createChat(Room room, String sender, String message){
        return Chat.builder().room(room).sender(sender).message(message).build();
    }
}
