package com.ssafy.chuanione.domain.chatroom.dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@ApiModel(value = "RoomListResponseDto", description = "room List 응답 Dto")
public class RoomListResponseDto {

    List<RoomResponseDto> list;

//    @ApiModelProperty(value = "성공 여부 (boolean)")
//    private boolean success;
//
//    @ApiModelProperty(value = "에러 메시지")
//    private String error;

}
