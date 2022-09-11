package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.dto.*;

import java.util.List;

public interface ChatService {
//    /** 채팅 메시지를 생성하는 registerChatMessage 입니다. **/
//    ChatMessage registerChatMessage(ChatMessageReq chatMessageReq, String userEmail);
    // 전체 채팅방 리스트
    List<RoomResponseDto> getListAll();
    // 채팅방 하나 조회
    RoomResponseDto getRoom(int room_id, int member_id);
    // 채팅방 생성
    void registRoom(int member_id);
    // 채팅방 삭제
    void deleteRoom(int room_id);
    // 채팅방 수정 RoomResponseDto를 파라미터로?
    RoomResponseDto updateRoom(int room_id, int member_id);
    // 채팅 받기
    ChatListResponseDto getMessages(int room_id, int member_id);
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
