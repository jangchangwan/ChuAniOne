package com.ssafy.chuanione.domain.review.dao;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.review.domain.ReviewMongoDB;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewMongoRepository extends MongoRepository<ReviewMongoDB, Integer> {

}
