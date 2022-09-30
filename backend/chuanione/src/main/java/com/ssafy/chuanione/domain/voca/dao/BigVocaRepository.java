package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface BigVocaRepository extends JpaRepository<BigVoca, Integer> {

    @Query(value = "select b from BigVoca b where b.vocaId not in :memorizeVoca")
    Page<BigVoca> findAll(Pageable pageable, List<Integer> memorizeVoca);
}
