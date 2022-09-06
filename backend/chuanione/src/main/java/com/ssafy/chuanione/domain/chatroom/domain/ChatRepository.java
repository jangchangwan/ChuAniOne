package com.ssafy.chuanione.domain.chatroom.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {


//    List<Chat> findAllByChatroom_ChatroomNo(long chatroomNo);
}
