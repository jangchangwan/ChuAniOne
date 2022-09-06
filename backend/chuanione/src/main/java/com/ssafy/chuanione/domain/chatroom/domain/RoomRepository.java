package com.ssafy.chuanione.domain.chatroom.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, Long> {
    int countByChatroomNo(long chatroomNo);

//    @Query(value = "delete from room where room_id in (select room_id from chatroom_user where member_id = ?1)", nativeQuery = true)
//    void deleteByUserNo(int userNo);
}
