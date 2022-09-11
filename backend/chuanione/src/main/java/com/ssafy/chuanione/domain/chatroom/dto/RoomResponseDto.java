package com.ssafy.chuanione.domain.chatroom.dto;


import com.ssafy.chuanione.domain.chatroom.domain.JoinUser;
import com.ssafy.chuanione.domain.chatroom.domain.Room;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@ApiModel(value = "RoomResponseDto", description = "Room 응답 Dto")
public class RoomResponseDto {

    private int id;
    private String name;
    private String tag1;
    private String tag2;
    private String tag3;

    // private Member memberId;
//    private String memberNickname;

    // 최대 참가자 수
    private int max;

    // 현재 참가자 수
    private int count;

    public static RoomResponseDto from(Room room, JoinUser joinuser, int count) {
        if (room == null) return null;

//        int tempCount =


        return RoomResponseDto.builder()
                .id(room.getId())
                .name(room.getName())
                .tag1(room.getTag1())
                .tag2(room.getTag2())
                .tag3(room.getTag3())
                .max(room.getMax())
                .count(count) // 몇개인지 count해서 보내줘야함
////                .memberNickname(member.get~) -> Member 이후
////                .message()
                .build();
    }



}
