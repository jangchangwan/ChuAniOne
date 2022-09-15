package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.domain.*;
import com.ssafy.chuanione.domain.chatroom.dto.*;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;

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

    // 전체 채팅방 리스트 - 페이지네이션
    @Override
    public Map<String, Object> getListAllPage(int page) {
//        Page<Perfume> perfumePage = perfumeRepository.findAll(PageRequest.of(page, 16, Sort.by("koName")));
        Page<Room> roomPage = roomRepository.findAll(PageRequest.of(page,5));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<Room> rooms = roomPage.getContent();
        List<RoomResponseDto> dtoList = new LinkedList<>();
        for(Room room : rooms){
            int count = joinUserRepository.countDistinctById(room.getId());
            Member member = room.getAdmin();
            dtoList.add(RoomResponseDto.from(room,count,member));
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",dtoList);
        return map;
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

    // 검색 리스트
    @Override
    public RoomListResponseDto searchRoom(String keyword) {
        return null;
    }

    // 입장중인 리스트 
    @Override
    public Map<String, Object> getMyList(int member_id, int page) {
        Page<Integer> roomPage = joinUserRepository.getMyList(PageRequest.of(page,5), member_id);
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<Integer> roomList = roomPage.getContent(); //joinUser에서 가져온 room_id 리스트


        List<RoomResponseDto> dtoList = new LinkedList<>();
        for(int room_id : roomList){
            Room room = roomRepository.findOne(room_id);
            int count = joinUserRepository.countDistinctById(room_id); // joinUser의 숫자
            Member member = room.getAdmin(); // 이거맞는지모름
            dtoList.add(RoomResponseDto.from(roomRepository.save(room), count, member));
//            dtoList.add(RoomResponseDto.from(room,count,member));
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",dtoList);
        return map;
    }

    // 채팅방 입장
    @Override
    public void enterRoom(int room_id, int member_id) {
        // member
        // UserEntity user = userRepository.findById(dto.getWriter()).orElseThrow(UserNotFoundException::new);
        Room room = roomRepository.findOne(room_id);
        Member member = memberRepository.getReferenceById(member_id);
        JoinUser joinUser = JoinUser.builder()
                .room_id(room)
                .member_id(member)
                .build();
        joinUserRepository.save(joinUser);

    }

    // 채팅방 퇴장
    @Override
    public void exitRoom(int room_id, int member_id) {
//        joinUserRepository.deleteById(room_id,member_id);

       joinUserRepository.deleteById(room_id,member_id);

    }
}
