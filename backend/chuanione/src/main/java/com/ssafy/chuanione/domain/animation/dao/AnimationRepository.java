package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


//@Repository
//@Transactional
public interface AnimationRepository extends MongoRepository<Animation, Integer> {

    Page<Animation> findAll(Pageable pageable);

     @Query(value = " { '$and' : [{ 'genres' : { '$in' : ?0 } }, { 'tags' : { '$in' : ?1 } }, { 'name' : { $regex : ?2 } }] }" )
     Page<Animation> findSearch(String[] genres, String[] tags, String keyword, Pageable pageable);

    @Query(value = " { '$and' : [{ 'genres' : { '$in' : ?0 } }, { 'name' : { $regex : ?1 } }] }" )
    Page<Animation> findSearchA(String[] genres,  String keyword, Pageable pageable);
    @Query(value = " { '$and' : [ { 'tags' : { '$in' : ?0 } }, { 'name' : { $regex : ?1 } }] }" )
    Page<Animation> findSearchB(String[] tags, String keyword, Pageable pageable);
    @Query(value = " { '$and' : [{ 'name' : { $regex : ?0 } }] }" )
    Page<Animation> findSearchAB( String keyword, Pageable pageable);


    @Query(value = "{id:?0}")
    Animation getAnimationBy_id(int id);


    @Query(value = "{id:?0}", fields = "{ related : 1 }")
    Animation getRelationBy_id(int id);
}
