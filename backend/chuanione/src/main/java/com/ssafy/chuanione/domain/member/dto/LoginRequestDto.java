package com.ssafy.chuanione.domain.member.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@ApiModel(value = "LoginRequestDto", description = "Login 요청 Dto")
public class LoginRequestDto {
    @NotBlank
    @ApiModelProperty(value = "이메일")
    private String email;
    @NotBlank
    @ApiModelProperty(value = "비밀번호")
    private String password;
}
