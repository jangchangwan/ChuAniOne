package com.ssafy.chuanione.domain.chatroom.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Column;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface JoinUserRepository extends JpaRepository<JoinUser, Long> {

    //방마다 참가자수
    @Query(nativeQuery = true, value ="SELECT COUNT(*) FROM member_room where room_id = ?1 group by room_id")
    int countDistinctById(int room_id);

    //참가자 삭제
    //room_id 와 member_id 조건걸어야함
    @Modifying
    @Query(nativeQuery = true, value ="DELETE FROM member_room WHERE room_id = ?1 and member_id = ?2")
    void deleteById(int room_id, int member_id);


//    //참가자 추가 -> save로 된다. 기본제공인가?
//    @Query(nativeQuery = true, value ="INSERT INTO member_room (member_id,room_id) VALUES (?1,?2)")
//    void insertJoin(int room_id, int member_id);

    //참가자 조회
    @Query(nativeQuery = true, value ="SELECT * FROM member_room where room_id = ?1")
    List<JoinUser> findAllByRoom_id(int room);

    // 한 채팅방에 관한 참가자 모두 삭제 -> 안쓸듯
//    @Query(nativeQuery = true, value ="delete from member_room where room_id = ?1")
//    void deleteJoinUserByRoom(int room);

    // 참여중인 채팅방 id 리스트
    @Query(nativeQuery = true, value ="SELECT * FROM member_room where member_id = :member_id")
    Page<JoinUser> findByMemberId(int member_id, Pageable pageable);
//    Page<JoinUser> getMyList(Pageable pageable, @Param("member_id")int member_id);

    // 해당 방에 참가중인지 확인용
    int countByMemberIdAndRoomId(int room_id, int member_id);
}
