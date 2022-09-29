package com.ssafy.chuanione.domain.review.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.review.dao.ReviewRepository;
import com.ssafy.chuanione.domain.review.domain.Review;
import com.ssafy.chuanione.domain.review.dto.ReviewRequestDto;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService{

    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;


    @Override
    public List<ReviewResponseDto> getList(int id) {
        List<Review> list = reviewRepository.findByAnimation(id);
        List<ReviewResponseDto> resList = new ArrayList<>();
        for(Review review : list){
            resList.add(ReviewResponseDto.from(review));
        }
        return resList;
    }

    @Override
    public ReviewResponseDto insertReview(ReviewRequestDto dto, int id) {
        return null;
    }

    @Override
    public ReviewResponseDto updateReview(ReviewRequestDto dto, int id) {
        return null;
    }

    @Override
    public void deleteReview(int id) {

    }
}
