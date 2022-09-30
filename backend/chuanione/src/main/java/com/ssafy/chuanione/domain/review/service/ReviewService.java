package com.ssafy.chuanione.domain.review.service;

import com.ssafy.chuanione.domain.review.dto.ReviewRequestDto;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;

import java.util.List;
import java.util.Map;

public interface ReviewService {

    Map<String,Object> getList(int id);
    Object insertReview(ReviewRequestDto dto, int id);
    ReviewResponseDto updateReview(ReviewRequestDto dto, int id);
    void deleteReview(int id);
    Object getMyReview(int id);


}
