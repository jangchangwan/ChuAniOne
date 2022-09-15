package com.ssafy.chuanione.domain.chatroom.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query(nativeQuery = true, value ="SELECT * FROM chat where room_id = ?1")
    List<Chat> findAllByRoomId(long room_id);
}
