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
@Table(name="animation_type")
public class AnimationType {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    private Integer type; // 1:좋아요 2:싫어요 3:찜 4: ??

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
    private Integer animation_id; // 테이블 참조안하고 별개로 관리

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member_id;

}
