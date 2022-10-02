package com.ssafy.chuanione.domain.member.dto;


import com.ssafy.chuanione.domain.member.domain.enumlist.Gender;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SignUpRequestDto", description = "회원가입 요청 Dto")
public class SignUpRequestDto {
    @NotBlank
    @ApiModelProperty(value = "이메일")
    private String email;
    @NotBlank
    @ApiModelProperty(value = "비밀번호")
    private String password;
    @NotBlank
    @ApiModelProperty(value = "닉네임")
    private String nickname;
    @NotBlank
    @ApiModelProperty(value = "생일")
    private String birthday;
    @ApiModelProperty(value = "성별")
    private Gender gender;
    @ApiModelProperty(value = "자기 소개")
    private String introduction;

}
