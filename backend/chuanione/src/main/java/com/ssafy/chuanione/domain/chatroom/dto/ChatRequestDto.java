package com.ssafy.chuanione.domain.chatroom.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@ApiModel(value = "ChatRequestDto", description = "Chat Req")
public class ChatRequestDto {

    @ApiModelProperty(value = "채팅방 번호")
    private int roomId;

    @ApiModelProperty(value = "유저 번호")
    private int memberId;

    @ApiModelProperty(value = "채팅 메시지")
//    @Size(min = 1, max = 1000, message = "1자 이상, 1000자 이하의 메시지만 입력하세요")
    private String message;


}
