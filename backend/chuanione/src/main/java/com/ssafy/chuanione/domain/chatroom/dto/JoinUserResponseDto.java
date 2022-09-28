package com.ssafy.chuanione.domain.chatroom.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "JoinUserResponseDto", description = "JoinUser 응답 Dto / 채팅방 정보와 함께 반환. 참여자들 정보")
public class JoinUserResponseDto {
    private Integer memberId; //참가자 아이디
    private String nickname; //참가자 닉네임
    private String profile; //프로필 url

    public static JoinUserResponseDto from(Member member){
        return JoinUserResponseDto.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .profile(member.getProfile())
                .build();
    }
}
