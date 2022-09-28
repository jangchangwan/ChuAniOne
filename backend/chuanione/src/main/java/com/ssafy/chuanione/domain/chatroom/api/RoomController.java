package com.ssafy.chuanione.domain.chatroom.api;

import com.ssafy.chuanione.domain.chatroom.dto.ChatResponseDto;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/room")
public class RoomController {

    private final ChatService chatService;

    @GetMapping("/list.do/{page}")
    @ApiOperation(value = "전체 채팅방 목록 가져오기 / 페이지네이션 1부터시작")
    public ResponseEntity<Map<String,Object>> getListAll(@PathVariable int page) {
        Map<String,Object> rooms = chatService.getListAllPage(page-1);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/list/join/{page}")
    @ApiOperation(value = "참여중인 채팅방 목록 가져오기 / page 1부터 시작")
    public ResponseEntity<Map<String,Object>> getMyList(@PathVariable int page) {
        Map<String,Object> list = chatService.getMyList(page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/search.do/{keyword}/page/{page}")
    @ApiOperation(value = "채팅방 검색 목록 가져오기 / page 1부터 시작")
    public ResponseEntity<Map<String,Object>> getSearchList(@PathVariable String keyword,@PathVariable int page) {
        Map<String,Object> list = chatService.getSearchList(keyword,page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/search/join/{keyword}/page/{page}")
    @ApiOperation(value = "참여중인 채팅방에서 검색 목록 가져오기 / page 1부터 시작")
    public ResponseEntity<Map<String,Object>> getJoinSearchList(@PathVariable String keyword,@PathVariable int page) {
        Map<String,Object> list = chatService.getJoinSearchList(keyword,page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @PostMapping("/room")
    @ApiOperation(value = "채팅방 생성 ")
    public ResponseEntity<RoomResponseDto> insertRoom(@RequestBody RoomRequestDto dto) {
        System.out.println("호출");
        RoomResponseDto response = chatService.insertRoom(dto);
        return (response != null) ?
                ResponseEntity.status(HttpStatus.OK).body(response) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

//    @DeleteMapping("/room/{id}")
//    @ApiOperation(value = "채팅방 삭제 (id:채팅방)")
//    public ResponseEntity<Integer> deleteRoom(@PathVariable int id) {
//        chatService.deleteRoom(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PatchMapping("/room/{id}")
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

    @PostMapping("/join/{id}")
    @ApiOperation(value = "채팅방 입장 (id:채팅방)")
    public ResponseEntity<String> enterRoom(@PathVariable int id) {
        int temp = chatService.enterRoom(id);
        if(temp == 1){ // 성공
            return new ResponseEntity<>("success",HttpStatus.OK);
        }else if(temp == -1){ // 꽉찼을때
            return new ResponseEntity<>("full",HttpStatus.OK);
        }else // 둘다 아니어서 실패하면
        return new ResponseEntity<>("fail",HttpStatus.OK);
    }

    @DeleteMapping("/join/{id}")
    @ApiOperation(value = "채팅방 퇴장 (id:채팅방) / 방장이라면 방 삭제 ")
    public ResponseEntity<Void> exitRoom(@PathVariable int id) {
        chatService.exitRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/chatlist/{id}")
    @ApiOperation(value = "채팅방 입장시 이전 채팅 내역 불러오기 (id:채팅방)")
    public ResponseEntity<List<ChatResponseDto>> getChatList(@PathVariable int id) {
        List<ChatResponseDto> list = chatService.getChatList(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
