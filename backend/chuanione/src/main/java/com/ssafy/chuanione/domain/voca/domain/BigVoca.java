package com.ssafy.chuanione.domain.voca.domain;

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
@Table(name="bigvoca")
public class BigVoca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voca_id")
    private Integer voca_id;             // 단어 번호
    private String japanese;        // 일본어
    private String pronunciation;   // 발음
    private String korean;          // 한국어
    private Integer frequency;      // 빈도수

}
