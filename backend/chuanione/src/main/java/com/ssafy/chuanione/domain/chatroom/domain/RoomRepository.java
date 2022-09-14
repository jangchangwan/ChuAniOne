package com.ssafy.chuanione.domain.chatroom.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    // 전체 채팅 수
//    int countByChatroomNo(long chatroomNo);

    // 방 하나 조회
    @Query(value = "select * from room where room_id = ?1", nativeQuery = true)
    Room findOne(int room_id);

//    @Query(value = "delete from room where room_id in (select room_id from chatroom_user where member_id = ?1)", nativeQuery = true)
//    void deleteByUserNo(int userNo);
    // 방 생성


    // 방 삭제
    @Query(value = "delete from room where room_id = ?1", nativeQuery = true)
    void deleteByIdInQuery(int id);

    // 방 수정

    // 전체 리스트
    List<Room> findAll();

    // 입장중인 리스트

    // 검색 리스트


}
