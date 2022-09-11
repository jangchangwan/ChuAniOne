package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.dto.*;

public interface ChatService {
//    /** 채팅 메시지를 생성하는 registerChatMessage 입니다. **/
//    ChatMessage registerChatMessage(ChatMessageReq chatMessageReq, String userEmail);
    // 전체 채팅방 리스트
    RoomListResponseDto listRoom(int userNo);
    // 채팅방 하나 조회
    RoomResponseDto findRoom(long chatroomNo, int myUserNo);
    // 채팅방 삭제
    void deleteRoom(long chatroomNo);
    // 채팅 리스트
    ChatListResponseDto getMessages(long chatroomNo, int myUserNo);
    // 채팅 보내기
    ChatResponseDto sendMessage(ChatRequestDto chatRequestDto);
//    ChatResponseDto
}
