package com.ssafy.chuanione.domain.review.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;

import javax.persistence.*;
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
    @GeneratedValue
    @Column(name="review_id")
    private Integer id;
    private String content; // 리뷰내용
    private LocalDateTime date; //리뷰작성일
    private double rating; //리뷰별점
    @Column(name = "animation_id")
    private Integer animationId; //애니메이션 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId; //멤버 번호

    public void patch(Review review){
        if(review.content != null ) this.content = review.content;
        if(review.rating != 0.0 ) this.rating = review.rating;
        this.date = review.date;
    }

}
