package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


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

    // 애니메이션 아이디 리스트로 해당 애니메이션 상세 조회
    // 메인 - 8개(페이지네이션 X)
    @Query(value = "{'id': {'$in': ?0 }}")
    List<Animation> findAllByQuery(int[] aniId);
    // 더보기 - 14개
    @Query(value = "{'id': {'$in': ?0 }}")
    Page<Animation> findAllByQuery(int[] aniId, Pageable pageable);

    @Query(value = "{id:?0}")
    Animation getAnimationBy_id(int id);


    @Query(value = "{id:?0}", fields = "{ related : 1 }")
    Animation getRelationBy_id(int id);

}
