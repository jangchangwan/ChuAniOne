package com.ssafy.chuanione.domain.chatroom.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
//    List<Room> findAll();
     Page<Room> findAll(Pageable pageable);

    // 입장중인 리스트

    // 검색 리스트
//    @Query(value = "select * from room where name = ?1 or tag1 or tag2 or tag3", nativeQuery = true)
//    countQuery
//    Page<Room> findByNameTag(Pageable pageable, String keyword);
    Page<Room> findByNameLikeOrTag1LikeOrTag2LikeOrTag3Like(Pageable pageable, String name, String tag1, String tag2, String tag3);
}
