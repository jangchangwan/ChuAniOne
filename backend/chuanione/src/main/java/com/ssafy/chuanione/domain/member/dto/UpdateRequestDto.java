package com.ssafy.chuanione.domain.member.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "UpdateRequestDto", description = "회원수정 요청 Dto")
public class UpdateRequestDto {
    private String profile;
    private String nickname;
    private String introduction;
    private String password;

    public Member toEntity(){
        return Member.builder()
                .profile(profile)
                .nickname(nickname)
                .introduction(introduction)
                .password(password)
                .build();
    }
}
