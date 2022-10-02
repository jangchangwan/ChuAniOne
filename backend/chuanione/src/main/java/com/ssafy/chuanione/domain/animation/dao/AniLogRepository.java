package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.AniLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AniLogRepository extends MongoRepository<AniLog, Integer> {

    @Query(value = "{'member_id':?0}")
    List<AniLog> findByMemberId(int memberId);
}
