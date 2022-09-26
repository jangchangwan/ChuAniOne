package com.ssafy.chuanione.domain.chatroom.dto;


import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@ApiModel(value = "ChatListResponseDto", description = "chat List 응답 Dto")
public class ChatListResponseDto {

    List<ChatResponseDto> list;

}
