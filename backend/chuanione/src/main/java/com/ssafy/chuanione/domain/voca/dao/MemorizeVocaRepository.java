package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.MyVocaJoinInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface MemorizeVocaRepository extends JpaRepository<MemorizeVoca, Integer> {

    // 멤버 아이디와 보카 아이디로 하나 찾기 ( 삭제용 )
    @Query(nativeQuery = true, value ="SELECT * FROM memorize_voca where member_id = :member_id and voca_id = :voca_id")
    MemorizeVoca findByMemberIdAndVocaId(int member_id, int voca_id);

    // 멤버 단어
    @Query(nativeQuery = true, value = "SELECT b.voca_id, b.japanese, b.pronunciation, b.korean, b.frequency FROM memorize_voca AS m LEFT JOIN bigvoca AS b ON m.voca_id = b.voca_id WHERE m.member_id = :memberId")
//    countQuery = "SELECT count(voca_id) FROM memorize_voca WHERE member_id = :memberId"
    List<MyVocaJoinInterface> findAllByMemberId(int memberId);

}
