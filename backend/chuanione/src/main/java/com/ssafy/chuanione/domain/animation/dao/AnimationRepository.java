package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;


//@Repository
//@Transactional
public interface AnimationRepository extends MongoRepository<Animation, Integer> {

    Page<Animation> findAll(Pageable pageable);

    @Query("{id:?0}")
    Optional<Animation> getAnimationBy_id(int id);


}
