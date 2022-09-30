package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
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

    List<MemorizeVoca> findAllByMemberId(Member member);
}
