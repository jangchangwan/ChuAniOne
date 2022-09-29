package com.ssafy.chuanione.domain.talktalk.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
@Table(name="talktalk")
public class Talktalk {

    @Id
    @GeneratedValue
    @Column(name="talktalk_id")
    private Integer id;

    private String content;
    private String image; //url

    @CreatedDate
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member writer; //작성자

    @Column(name="animation_id")
    private Integer animation;


}
