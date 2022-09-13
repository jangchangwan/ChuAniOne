package com.ssafy.chuanione.domain.chatroom.dto;


import com.ssafy.chuanione.domain.chatroom.domain.Room;
import com.ssafy.chuanione.domain.member.domain.Member;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@ApiModel(value = "RoomRequestDto", description = "Room 요청 Dto")
public class RoomRequestDto {

    private int id; //방번호
    private String name; //방이름
    private String tag1;
    private String tag2;
    private String tag3;
    private Integer memberId; //방장
    private int max; //최대인원


    public static Room toEntity(RoomRequestDto roomRequestDto, Member member){
        return Room.builder()
                .name(roomRequestDto.getName())
                .tag1(roomRequestDto.getTag1())
                .tag2(roomRequestDto.getTag2())
                .tag3(roomRequestDto.getTag3())
                .admin(member)
                .max(roomRequestDto.getMax())
                .build();
    }
}
