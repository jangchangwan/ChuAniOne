package com.ssafy.chuanione.domain.member.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "MyPageResponseDto", description = "마이페이지 응답 Dto")
public class MyPageResponseDto {
    // 회원 정보
    private MemberResponseDto member;
    // 경험치
    // 상위 6개 장르
//    private GenresResponseDto genres;
    // 내 뱃지

    public static MyPageResponseDto from(Member member){
        if(member == null) return null;
        return MyPageResponseDto.builder()
                .member(MemberResponseDto.from(member))
                .build();
    }
}
