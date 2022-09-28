package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.dto.*;

import java.util.List;
import java.util.Map;

public interface ChatService {

    // 전체 채팅방 리스트
//    List<RoomResponseDto> getListAll();
    // 전체 채팅방 리스트 - 페이지네이션
    Map<String, Object> getListAllPage(int page);
    // 채팅방 하나 조회
    Map<String, Object> getRoom(int room_id);
    // 채팅방 생성 -> roomRequestDto : 멤버id, 방이름, tag 123, 최대인원
    RoomResponseDto insertRoom(RoomRequestDto roomRequestDto);
    // 채팅방 삭제 -> member_id 비교 필요.
    void deleteRoom(int room_id);
    // 채팅방 수정
    RoomResponseDto updateRoom(int id, RoomRequestDto roomRequestDto);
    // 채팅 받기
//    List<ChatResponseDto> getMessages(int room_id, int member_id);
    // 채팅 보내기
    ChatResponseDto sendMessage(ChatRequestDto chatRequestDto);
    // 검색 리스트
    Map<String, Object> getSearchList(String keyword, int page);
    // 참여중인 채팅방에서 검색 리스트
    Map<String, Object> getJoinSearchList(String keyword, int page);
    // 입장중인 리스트
    Map<String, Object> getMyList( int page);
    // 채팅방 입장
    Integer enterRoom(int room_id);
    // 채팅방 퇴장
    void exitRoom(int room_id);
    // @@ 님이 입장했습니다~
//    ChatResponseDto enterMessage(ChatRequestDto chatRequestDto);
    // 채팅방 들어갈때마다 이전 채팅 내역 불러오기
    List<ChatResponseDto> getChatList(int room_id);
}
