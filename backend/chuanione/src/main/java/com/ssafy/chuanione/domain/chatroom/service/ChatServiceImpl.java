package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.domain.*;
import com.ssafy.chuanione.domain.chatroom.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public List<RoomResponseDto> getListAll() {
        List<Room> list = roomRepository.findAll();
        List<RoomResponseDto> resList = new ArrayList<>();
        //이건써야함
//        list.forEach(e -> resList.add(new RoomResponseDto.from(Room e,JoinUser joinuser, int count)));

//        RoomListResponseDto roomListResponseDto = new RoomListResponseDto();
//        roomListResponseDto.setList(resList);
        return resList;
    }

    // 채팅방 하나 조회
    @Override
    public RoomResponseDto getRoom(int room_id, int member_id) {
//        Room room = roomRepository.findOne(int room_id, int member_id);
//        JoinUser joinUser = JoinUserRepository. -> 참가자 조회 메서드 만들기
        JoinUser joinUser = null;
        int count = 0; // joinUser의 숫자


//        return RoomResponseDto.from(roomRepository.save(room, joinUser, count));
        return null;
    }

    // 채팅방 생성
    @Override
    public void registRoom(int member_id) {
//        roomRepository.save();
    }

    // 채팅방 수정
    @Override
    public RoomResponseDto updateRoom(int room_id, int member_id) {

        return null;
    }

    // 채팅방 삭제
    @Override
    public void deleteRoom(int room_id) {
        roomRepository.deleteById((room_id));
    }

////////////////////////////////////////////////////////////////////////////////

    // 채팅 받기
    @Override
    public List<ChatResponseDto> getMessages(int room_id, int member_id) {
        List<ChatResponseDto> list = new ArrayList<>();
        return null;
    }

    // 채팅 보내기
    @Override
    public ChatResponseDto sendMessage(ChatRequestDto chatRequestDto) {

        LocalDateTime localDateTime = LocalDateTime.now();
        Chat chat = Chat.builder()
                .room(chatRequestDto.getRoomId())
                .sender(chatRequestDto.getMemberId())
                .message(chatRequestDto.getMessage())
                .sendDate(localDateTime)
                .build();

//        chat = chatRepository.save(chat);

        return ChatResponseDto.from(chat);
    }

    //////////////////////////////////////////////////////////////////////////////

    @Override
    public RoomListResponseDto searchRoom(String keyword) {
        return null;
    }

    @Override
    public RoomListResponseDto getListJoin(int member_id) {

        return null;
    }

    @Override
    public void registJoin(int room_id, int member_id) {
        // member
        // UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        JoinUser joinUser = JoinUser
                .builder()
//                .room_id(room_id)
//                .member_id(member_id)
                .build();
        joinUserRepository.save(joinUser);

    }

    @Override
    public void deleteJoin(int room_id, int member_id) {
        joinUserRepository.deleteById(room_id,member_id);

    }
}
