package com.ssafy.chuanione.domain.voca.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="memorize_voca")
public class MemorizeVoca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;             // 관계번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voca_id")
    private BigVoca voca_id;
}


