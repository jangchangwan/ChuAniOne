package com.ssafy.chuanione.domain.review.dao;

import com.ssafy.chuanione.domain.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByAnimation(int animation);
}
