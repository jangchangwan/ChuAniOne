package com.ssafy.chuanione.domain.chatroom.service;

import com.ssafy.chuanione.domain.chatroom.domain.*;
import com.ssafy.chuanione.domain.chatroom.dto.*;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//    // 전체 채팅방 리스트
//    @Override
//    public List<RoomResponseDto> getListAll() {
//        List<Room> list = roomRepository.findAll();
//        List<RoomResponseDto> resList = new ArrayList<>();
//        //이건써야함
//        for (Room room : list) {
//            int count = joinUserRepository.countDistinctById(room.getId());
//            Member member = room.getAdmin(); // 이거맞는지모름
//            resList.add(RoomResponseDto.from(roomRepository.save(room), count, member));
//        }
//
//        return resList;
//    }

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
                .roomId(room)
                .memberId(member)
                .build();
        joinUserRepository.save(joinuser);
        int count = room.getCount();
        return RoomResponseDto.from(room, count, member);
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

    // 채팅 받기 (입장할때 이전 내역들 받아오기)
    @Override
    public List<ChatResponseDto> getMessages(int room_id, int member_id) {
        List<ChatResponseDto> resList = new ArrayList<>();

        List<Chat> list = chatRepository.findAllByRoomId(room_id);

        for (Chat chat : list){
            Member member = chat.getSender(); // 여기에 member 값이 다 들어가나?
            resList.add(ChatResponseDto.from(chat,member));
        }

        return resList;
    }

    // 채팅 보내기
    @Override
    public ChatResponseDto sendMessage(ChatRequestDto chatRequestDto) {

        LocalDateTime localDateTime = LocalDateTime.now();
        Room room = roomRepository.findOne(chatRequestDto.getRoomId());
        Member member = memberRepository.getReferenceById(chatRequestDto.getMemberId());
        Chat chat = Chat.builder()
                .room(room)
                .sender(member)
                .message(chatRequestDto.getMessage())
                .sendDate(localDateTime)
                .build();

        chat = chatRepository.save(chat);
        
        // 오류났을때
//        if (chat == null) {
//            return new ChatRes(chatReq.getUserNo(), "", "/001.png", "[알림] 서버 오류로 채팅이 전송되지 않았습니다.",
//                    ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime()
//                            .format(DateTimeFormatter.ofPattern("a h:mm").withLocale(Locale.forLanguageTag("ko"))),
//                    1, false, null);
//        }

        return ChatResponseDto.from(chat, member);
    }

    //////////////////////////////////////////////////////////////////////////////

    // 검색 리스트
    @Override
    public Map<String, Object> getSearchList(String keyword, int page) {

//        Page<Room> roomPage = roomRepository.findAll(PageRequest.of(page,5));
        String name = keyword;
        String tag1 = keyword;
        String tag2 = keyword;
        String tag3 = keyword;
        Page<Room> roomPage = roomRepository.findByNameLikeOrTag1LikeOrTag2LikeOrTag3Like(PageRequest.of(page,5),"%"+name+"%", "%"+tag1+"%","%"+tag2+"%","%"+tag3+"%");
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

    // 입장중인 리스트 
    @Override
    public Map<String, Object> getMyList(int member_id, int page) {
        Page<JoinUser> roomPage = joinUserRepository.findByMemberId(member_id , PageRequest.of(page,5));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<JoinUser> roomList = roomPage.getContent(); //joinUser에서 가져온 room_id 리스트


        List<RoomResponseDto> dtoList = new LinkedList<>();

        System.out.println("///////////////////////////////////////////");
        for(JoinUser user : roomList){
            Room room = user.getRoomId();
//            System.out.println("room_id");
//            Room room = roomRepository.findOne(room_id);
            int count = joinUserRepository.countDistinctById(room.getId()); // joinUser의 숫자
            Room target = Room.builder().count(count).build(); // count 업데이트용
            room.patch(target);
            Member member = room.getAdmin();
            dtoList.add(RoomResponseDto.from(roomRepository.save(room), count, member));
//            dtoList.add(RoomResponseDto.from(room,count,member));
        }

        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",dtoList);
//        map.put("temp",roomList);
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
                .roomId(room)
                .memberId(member)
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
