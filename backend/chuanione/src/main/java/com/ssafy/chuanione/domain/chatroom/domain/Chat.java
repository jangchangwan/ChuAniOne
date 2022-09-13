package com.ssafy.chuanione.domain.chatroom.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
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
@Builder
@AllArgsConstructor
@ToString
@Table(name="chat")
public class Chat {

    @Id
    @GeneratedValue
    @Column(name="chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room; //방번호

    // member 생기면 변경
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member sender; //보낸사람


    @Column(columnDefinition = "TEXT")
    private String message;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime sendDate;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="member_id", nullable=false, updatable=false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @NotNull
//    private Member member;

//    @Builder
//    public Chat(Room room, String sender, String message){
//        this.room=room;
//        this.sender=sender;
//        this.message=message;
//        this.sendDate = LocalDateTime.now();
//    }
//
//
//    /**채팅 생성
//     * @param room 채팅 방
//     * @param sender 보낸이
//     * */
//
//    public static Chat createChat(Room room, String sender, String message){
//        return Chat.builder().room(room).sender(sender).message(message).build();
//    }
}
