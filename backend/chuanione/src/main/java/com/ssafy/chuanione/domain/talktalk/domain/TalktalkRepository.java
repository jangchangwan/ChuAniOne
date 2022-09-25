package com.ssafy.chuanione.domain.talktalk.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface TalktalkRepository extends JpaRepository<Talktalk, Integer> {

//    List<Talktalk>
}
