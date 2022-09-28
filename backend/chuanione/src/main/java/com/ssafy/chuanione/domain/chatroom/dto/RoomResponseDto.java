package com.ssafy.chuanione.domain.chatroom.dto;

import com.ssafy.chuanione.domain.chatroom.domain.Room;
import com.ssafy.chuanione.domain.member.domain.Member;
import io.swagger.annotations.ApiModel;
import lombok.*;


@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "RoomResponseDto", description = "Room 응답 Dto")
public class RoomResponseDto {

    private int id;
    private String name;
    private String tag1;
    private String tag2;
    private String tag3;

    private Integer memberId;
    private String nickname;

    // 최대 참가자 수
    private int max;

    // 현재 참가자 수
    private int count;

    private boolean isJoined;

//    private List<JoinUser> joinList;




    public static RoomResponseDto from(Room room,  int count, Member member) {
        if (room == null) return null;

        return RoomResponseDto.builder()
                .id(room.getId())
                .name(room.getName())
                .tag1(room.getTag1())
                .tag2(room.getTag2())
                .tag3(room.getTag3())
                .max(room.getMax())
                .count(count)
//                .joinList(joinList)
                .memberId(member.getId()) //방장 아이디
                .nickname(member.getNickname()) //방장 닉네임
//                .isJoined(isJoined)
                .build();
    }

    public static RoomResponseDto temp(Room room,  int count, Member member, boolean isJoined) {
        if (room == null) return null;

        return RoomResponseDto.builder()
                .id(room.getId())
                .name(room.getName())
                .tag1(room.getTag1())
                .tag2(room.getTag2())
                .tag3(room.getTag3())
                .max(room.getMax())
                .count(count)
//                .joinList(joinList)
                .memberId(member.getId()) //방장 아이디
                .nickname(member.getNickname()) //방장 닉네임
                .isJoined(isJoined)
                .build();
    }



}
