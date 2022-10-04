package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.voca.domain.BigVocaMongo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Map;

public interface BigVocaMongoRepository extends MongoRepository<BigVocaMongo, String> {

    @Query(value = "{'ani_id': ?0, words: 1}")
    List<BigVocaMongo> findByAni_id(int ani_id);

}
