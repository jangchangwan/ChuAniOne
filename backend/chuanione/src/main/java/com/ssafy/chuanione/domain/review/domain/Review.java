package com.ssafy.chuanione.domain.review.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
@Table(name="review")
public class Review {
    @Id
    @Column(name="review_id")
    private Integer id;
    private String content; // 리뷰내용
    private LocalDateTime date; //리뷰작성일
    private double rating; //리뷰별점
    private Integer animation; //애니메이션 번호



}
