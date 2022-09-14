package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.domain.*;
import com.ssafy.chuanione.domain.chatroom.dto.*;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
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
@Slf4j
@Service
@Transactional
public class ChatServiceImpl implements ChatService {

    //     private final CommentRepository commentRepository;
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private JoinUserRepository joinUserRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 전체 채팅방 리스트
    @Override
    public List<RoomResponseDto> getListAll() {
        List<Room> list = roomRepository.findAll();
        List<RoomResponseDto> resList = new ArrayList<>();
        //이건써야함
        for (Room room : list) {
            int count = joinUserRepository.countDistinctById(room.getId());
            Member member = room.getAdmin(); // 이거맞는지모름
            resList.add(RoomResponseDto.from(roomRepository.save(room), count, member));
        }

        return resList;
    }

    // 채팅방 하나 조회
    @Override
    public RoomResponseDto getRoom(int room_id) {
        Room room = roomRepository.findOne(room_id);
        int count = joinUserRepository.countDistinctById(room_id); // joinUser의 숫자

//        Member member = memberRepository.getReferenceById(room.getAdmin());
        Member member = room.getAdmin(); // 이거맞는지모름

        return RoomResponseDto.from(roomRepository.save(room), count, member);
//        return null;
    }

    // 채팅방 생성
    @Override
    public RoomResponseDto insertRoom(RoomRequestDto roomRequestDto) {
//        Member member = memberRepository.findById(roomRequestDto.getWriter()).orElseThrow(UserNotFoundException::new);
        Member member = memberRepository.getReferenceById(roomRequestDto.getMemberId());
        Room room = roomRequestDto.toEntity(roomRequestDto, member);
        roomRepository.save(room);
//        joinUserRepository.insertJoin(room.getId(),member.getId());
        JoinUser joinuser = JoinUser.builder()
                .room_id(room)
                .member_id(member)
                .build();
        joinUserRepository.save(joinuser);
        return RoomResponseDto.from(room, 1, member);
    }

    // 채팅방 수정
    @Override
    public RoomResponseDto updateRoom(int id, RoomRequestDto roomRequestDto) {
        //        Member member = memberRepository.findById(roomRequestDto.getWriter()).orElseThrow(UserNotFoundException::new);
        Room target = roomRepository.findOne(id);
        // 방장이랑 요청한사람이 같은지 비교필요
        Member member = target.getAdmin();
        Room room = roomRequestDto.toEntity(roomRequestDto, member);
        target.patch(room);
        Room updated = roomRepository.save(target);

        // 참여인원
        int count = joinUserRepository.countDistinctById(id);
//int count = 0;
        return RoomResponseDto.from(updated, count, member);
    }

    // 채팅방 삭제
    @Override
    public void deleteRoom(int room_id) {
        Room room = roomRepository.findById(room_id).orElse(null);
        List<JoinUser> list = joinUserRepository.findAllByRoom_id(room_id);
        for (JoinUser join : list) {
            joinUserRepository.delete(join);
        }
//        roomRepository.deleteByIdInQuery(room_id);
        roomRepository.delete(room);
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
//                .room(chatRequestDto.getRoomId())
//                .sender(chatRequestDto.getMemberId())
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
    public List<RoomResponseDto> getMyList(int member_id) {
        List<Integer> roomList = joinUserRepository.getMyList(member_id); //joinUser에서 가져온 room_id 리스트
        List<RoomResponseDto> result = new ArrayList<>();
        for(int room_id : roomList){
            Room room = roomRepository.findOne(room_id);
            int count = joinUserRepository.countDistinctById(room_id); // joinUser의 숫자
            Member member = room.getAdmin(); // 이거맞는지모름

            result.add(RoomResponseDto.from(roomRepository.save(room), count, member));
        }
        return result;
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
//        joinUserRepository.deleteById(room_id,member_id);

    }
}
