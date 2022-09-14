package com.ssafy.chuanione.domain.chatroom.api;

import com.ssafy.chuanione.domain.chatroom.dto.RoomRequestDto;
import com.ssafy.chuanione.domain.chatroom.dto.RoomResponseDto;
import com.ssafy.chuanione.domain.chatroom.service.ChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@MessageMapping("/{roomId}")
//@SendTo("/room/{roomId}")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/list.do")
    @ApiOperation(value = "전체 채팅방 목록 가져오기 / 페이지네이션 아직")
    public ResponseEntity<List<RoomResponseDto>> getListAll() {

        List<RoomResponseDto> list = chatService.getListAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/list.do/{id}")
    @ApiOperation(value = "참여중인 채팅방 목록 가져오기 / 페이지네이션 아직  (id:사용자)")
    public ResponseEntity<List<RoomResponseDto>> getMyList(@PathVariable int id) {
        List<RoomResponseDto> list = chatService.getMyList(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/search.do/{keyword}")
    @ApiOperation(value = "채팅방 검색 목록 가져오기 / 미완료")
    public ResponseEntity<List<RoomResponseDto>> getSearchList() {
        List<RoomResponseDto> list = chatService.getListAll();
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
    @ApiOperation(value = "채팅방 하나 조회 (id:채팅방)")
    public ResponseEntity<RoomResponseDto> getRoom(@PathVariable int id) {
        return new ResponseEntity<>(chatService.getRoom(id), HttpStatus.OK);
    }




}
