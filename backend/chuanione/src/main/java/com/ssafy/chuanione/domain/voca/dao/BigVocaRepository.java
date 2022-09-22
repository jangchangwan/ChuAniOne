package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface BigVocaRepository extends JpaRepository<BigVoca, Integer> {
    Page<BigVoca> findAll(Pageable pageable);
}
