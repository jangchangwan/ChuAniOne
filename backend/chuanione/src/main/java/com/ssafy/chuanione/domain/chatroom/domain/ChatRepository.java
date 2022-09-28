package com.ssafy.chuanione.domain.chatroom.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query(nativeQuery = true, value ="SELECT * FROM chat where room_id = ?1")
    List<Chat> findAllByRoomId(long room_id);
}
