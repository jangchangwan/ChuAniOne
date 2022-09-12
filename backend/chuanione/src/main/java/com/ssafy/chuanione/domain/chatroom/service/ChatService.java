package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.dto.*;

import java.util.List;

public interface ChatService {

    // 전체 채팅방 리스트
    List<RoomResponseDto> getListAll();
    // 채팅방 하나 조회
    RoomResponseDto getRoom(int room_id, int member_id);
    // 채팅방 생성 -> roomRequestDto : 멤버id, 방이름, tag 123, 최대인원
    void registRoom(int member_id);
    // 채팅방 삭제 -> member_id 비교 필요.
    void deleteRoom(int room_id);
    // 채팅방 수정 RoomResponseDto를 파라미터로?
    RoomResponseDto updateRoom(int room_id, int member_id);
    // 채팅 받기 -> 필요없을지도
    List<ChatResponseDto> getMessages(int room_id, int member_id);
    // 채팅 보내기
    ChatResponseDto sendMessage(ChatRequestDto chatRequestDto);
    // 검색 리스트
    RoomListResponseDto searchRoom(String keyword);
    // 입장중인 리스트
    RoomListResponseDto getListJoin(int member_id);
    // 채팅방 입장
    void registJoin(int room_id, int member_id);
    // 채팅방 퇴장
    void deleteJoin(int room_id, int member_id);
}
