package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.domain.ChatRepository;
import com.ssafy.chuanione.domain.chatroom.domain.JoinUserRepository;
import com.ssafy.chuanione.domain.chatroom.domain.RoomRepository;
import com.ssafy.chuanione.domain.chatroom.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

//@RequiredArgsConstructor
//@Transactional
//@Slf4j
@Service
public class ChatServiceImpl implements ChatService {

//     private final CommentRepository commentRepository;
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private JoinUserRepository joinUserRepository;

    @Autowired
    private RoomRepository roomRepository;


    // 전체 채팅방 리스트
    @Override
    public RoomListResponseDto listRoom(int userNo) {
        List<>
        return null;
    }

    // 채팅방 하나 조회
    @Override
    public RoomResponseDto findRoom(long chatroomNo, int myUserNo) {
        return null;
    }

    // 채팅방 삭제 
    @Override
    public void deleteRoom(long chatroomNo) {

    }

    // 채팅 리스트
    @Override
    public ChatListResponseDto getMessages(long chatroomNo, int myUserNo) {
        return null;
    }

    // 채팅 보내기
    @Override
    public ChatResponseDto sendMessage(ChatRequestDto chatRequestDto) {
        return null;
    }
}
