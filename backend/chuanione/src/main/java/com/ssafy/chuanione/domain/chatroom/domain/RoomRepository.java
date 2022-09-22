package com.ssafy.chuanione.domain.chatroom.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface RoomRepository extends JpaRepository<Room, Integer> {


    // 방 하나 조회
    @Query(value = "select * from room where room_id = ?1", nativeQuery = true)
    Room findOne(int room_id);

    // 방 삭제
    @Query(value = "delete from room where room_id = ?1", nativeQuery = true)
    void deleteByIdInQuery(int id);

    // 방 수정


    // 전체 리스트
     Page<Room> findAll(Pageable pageable);

    // 입장중인 리스트

    // 검색 리스트
    Page<Room> findByNameLikeOrTag1LikeOrTag2LikeOrTag3Like(Pageable pageable, String name, String tag1, String tag2, String tag3);
}
