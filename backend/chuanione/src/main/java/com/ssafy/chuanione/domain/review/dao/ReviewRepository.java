package com.ssafy.chuanione.domain.review.dao;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByAnimationId(int animation_id);
    Review findByAnimationIdAndMemberId(int animation_id, Member member_id);
}
