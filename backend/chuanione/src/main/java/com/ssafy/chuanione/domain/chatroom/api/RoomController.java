package com.ssafy.chuanione.domain.chatroom.api;

import com.ssafy.chuanione.domain.chatroom.dto.RoomRequestDto;
import com.ssafy.chuanione.domain.chatroom.dto.RoomResponseDto;
import com.ssafy.chuanione.domain.chatroom.service.ChatService;
import com.ssafy.chuanione.global.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/room")
public class RoomController {

//    @RequestHeader 헤더에 토큰담아서 보낸다면~


    private final ChatService chatService;

    @GetMapping("/list.do/{page}")
    @ApiOperation(value = "전체 채팅방 목록 가져오기 / 페이지네이션 1부터시작")
    public ResponseEntity<Map<String,Object>> getListAll(@PathVariable int page) {
        Map<String,Object> rooms = chatService.getListAllPage(page-1);

        return new ResponseEntity<>(rooms, HttpStatus.OK);

    }

    @GetMapping("/list.do/join/{id}/page/{page}")
    @ApiOperation(value = "참여중인 채팅방 목록 가져오기 (id:사용자) / page 1부터 시작")
    public ResponseEntity<Map<String,Object>> getMyList(@PathVariable int id,@PathVariable int page) {
        Map<String,Object> list = chatService.getMyList(id,page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/search.do/{keyword}/page/{page}")
    @ApiOperation(value = "채팅방 검색 목록 가져오기 / page 1부터 시작")
    public ResponseEntity<Map<String,Object>> getSearchList(@PathVariable String keyword,@PathVariable int page) {
        Map<String,Object> list = chatService.getSearchList(keyword,page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/room.do")
    @ApiOperation(value = "채팅방 생성 ")
    public ResponseEntity<RoomResponseDto> insertRoom(@RequestBody RoomRequestDto dto) {
        System.out.println("호출");
        RoomResponseDto response = chatService.insertRoom(dto);
//        return new ResponseEntity<>(response, HttpStatus.OK);
        return (response != null) ?
                ResponseEntity.status(HttpStatus.OK).body(response) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/room.do/{id}")
    @ApiOperation(value = "채팅방 삭제 (id:채팅방)")
    public ResponseEntity<Integer> deleteRoom(@PathVariable int id) {
        chatService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/room.do/{id}")
    @ApiOperation(value = "채팅방 수정 (id:채팅방)")
    public ResponseEntity<RoomResponseDto> updateRoom(@PathVariable int id, @RequestBody RoomRequestDto dto) {
        RoomResponseDto result = chatService.updateRoom(id, dto);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build() :
                ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/room.do/{id}")
    @ApiOperation(value = "채팅방 하나 조회 + 참가자 목록 (id:채팅방)")
    public ResponseEntity<Map<String,Object>> getRoom(@PathVariable int id) {
        Map<String,Object> list = chatService.getRoom(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    /* 입 / 퇴장 */

    @PostMapping("/join.do/{id}")
    @ApiOperation(value = "채팅방 입장 (id:채팅방)")
    public ResponseEntity<Integer> enterRoom(@PathVariable int id) {
//        int member_id = map.get("memberId");
//        int member_id = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail);
//        int room_id = map.get("roomId");
        chatService.enterRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/join.do/{id}")
    @ApiOperation(value = "채팅방 퇴장 (id:채팅방)")
    public ResponseEntity<Integer> exitRoom(@PathVariable int id) {
//        int member_id = map.get("memberId");
//        int room_id = map.get("roomId");
        chatService.exitRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
