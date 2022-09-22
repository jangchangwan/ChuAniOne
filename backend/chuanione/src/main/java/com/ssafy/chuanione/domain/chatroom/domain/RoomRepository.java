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

    // 입장 중인 리스트에서 검색
    @Query(value = "select * from room \n" +
            "where (name like :name or tag1 like :tag1 or tag2 like :tag2 or tag3 like :tag3) and room_id in (select room_id from member_room where member_id = :member_id)", nativeQuery = true)
    Page<Room> searchJoinRoom(Pageable pageable, String name, String tag1, String tag2, String tag3, int member_id);
}
