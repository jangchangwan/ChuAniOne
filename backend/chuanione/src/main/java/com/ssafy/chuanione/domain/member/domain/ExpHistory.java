package com.ssafy.chuanione.domain.member.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@ToString
public class ExpHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_history_id")
    private Integer id;
    private int value;
    private Type type;
    private int communityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;
}