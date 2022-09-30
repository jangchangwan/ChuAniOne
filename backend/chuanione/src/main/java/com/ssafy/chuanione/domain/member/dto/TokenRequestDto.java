package com.ssafy.chuanione.domain.member.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "TokenRequestDto", description = "토큰 재발급 신청 Dto")
public class TokenRequestDto {
    private String accessToken;
    private String refreshToken;
}
