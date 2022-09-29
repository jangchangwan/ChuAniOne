package com.ssafy.chuanione.domain.review.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.review.domain.Review;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ReviewResponseDto", description = "Review 응답 Dto")
public class ReviewResponseDto {

    private Integer id;
    private String content; // 리뷰내용
    private LocalDateTime date; //리뷰작성일
    private double rating; //리뷰별점
    private Integer animation; //애니메이션 번호
    private Integer member_id;
    private String member_name;
    private String member_profile;

    public static ReviewResponseDto from(Review review){
        if(review == null) return null;

        return ReviewResponseDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .date(review.getDate())
                .rating(review.getRating())
                .animation(review.getAnimationId())
                .member_id(review.getMemberId().getId())
                .member_name(review.getMemberId().getNickname())
                .member_profile(review.getMemberId().getProfile())
                .build();
    }
}
