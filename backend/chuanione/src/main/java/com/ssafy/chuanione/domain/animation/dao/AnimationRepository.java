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

//    "$in"
//{"genres" : {"$in": ["판타지", "로맨스"]}}
     @Query(value = " { $and : { genres : { $in : ?0 } }, { tags : { $in : ?1 } }, { name : { $regex: ?2 , $option : i} } }" )
     Page<Animation> findSearch(String[] genres, String[] tags, String keyword, Pageable pageable);
//    @Query(value = " { name : { $regex: ?0, $options: i} } ")
//    Page<Animation> findSearch(String keyword, Pageable pageable); // 이거 됨
//    @Query(value = "{ genres : { $in: [?1, ?2, ?3] }, tags: { $in : [?4,?5,?6] } , keyword: ?7 }")
//    Page<Animation> findSearch(Pageable pageable, String genre1,String genre2,String genre3,String tag1,String tag2, String tag3, String keyword);
//@Query(value = " {$and : [ { genres : { $in : ?0 } }, {tags : { $in: ?1 }}, {keyword : { $regex: ?2, $options: i} } ]}")
//Page<Animation> findSearch(Collection genres, Collection tags, String keyword, Pageable pageable);



    @Query(value = "{id:?0}")
    Animation getAnimationBy_id(int id);


    @Query(value = "{id:?0}", fields = "{ related : 1 }")
    Animation getRelationBy_id(int id);
}
