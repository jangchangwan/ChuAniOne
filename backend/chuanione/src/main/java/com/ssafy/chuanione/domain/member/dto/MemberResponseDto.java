package com.ssafy.chuanione.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.chuanione.domain.member.domain.Gender;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.Role;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Builder
public class MemberResponseDto {
    private Integer memberId;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String nickname;
    private String birthday;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String introduction;
    private Role role;

    public static MemberResponseDto from(Member member){
        if(member == null) throw new RuntimeException("member엔티티가 null입니다.");

        return MemberResponseDto.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .birthday(member.getBirthday())
                .gender(member.getGender())
                .introduction(member.getIntroduction())
                .role(member.getRole())
                .build();
    }
}
