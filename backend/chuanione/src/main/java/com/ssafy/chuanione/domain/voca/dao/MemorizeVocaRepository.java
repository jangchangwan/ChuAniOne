package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface MemorizeVocaRepository extends JpaRepository<MemorizeVoca, Integer> {

    // 멤버 아이디와 보카 아이디로 하나 찾기 ( 삭제용 )
    MemorizeVoca findByMemberIdAndVocaId(int member_id, int voca_id);
}
