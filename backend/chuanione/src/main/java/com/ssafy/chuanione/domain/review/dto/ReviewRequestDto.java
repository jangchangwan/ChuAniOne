package com.ssafy.chuanione.domain.review.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.review.domain.Review;
import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ReviewRequestDto", description = "review 요청 Dto")
public class ReviewRequestDto {
    private String content; // 리뷰내용
    private double rating; //리뷰별점

    public static Review toEntity(ReviewRequestDto dto, Member member, int id, LocalDateTime time){
        return Review.builder()
                .animationId(id)
                .content(dto.getContent())
                .rating(dto.getRating())
                .memberId(member)
                .build();
    }
}
