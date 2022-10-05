package com.ssafy.chuanione.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.chuanione.domain.member.domain.enumlist.Gender;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.enumlist.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponseDto {
    private Integer memberId;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String nickname;
    private String birthday;
    private Gender gender;
    private String introduction;
    private String profile;
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
                .profile(member.getProfile())
                .role(member.getRole())
                .build();
    }
}
