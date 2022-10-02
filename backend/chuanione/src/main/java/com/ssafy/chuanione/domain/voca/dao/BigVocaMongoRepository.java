package com.ssafy.chuanione.domain.voca.dao;

import com.ssafy.chuanione.domain.voca.domain.BigVocaMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BigVocaMongoRepository extends MongoRepository<BigVocaMongo, String> {

    List<BigVocaMongo> findAll();
}
