package com.ssafy.chuanione.domain.animation.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
public class AnimationType {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    private Integer type; // 1:좋아요 2:싫어요 3:찜 4:시청

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
    private Integer animationId; // 테이블 참조안하고 별개로 관리

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

}
