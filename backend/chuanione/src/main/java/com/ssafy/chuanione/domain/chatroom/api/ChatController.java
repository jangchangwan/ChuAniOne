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

    @GetMapping("/list")
    @ApiOperation(value = "전체 채팅방 목록 가져오기 / 페이지네이션 아직")
    public ResponseEntity<List<RoomResponseDto>> getListAll() {
        List<RoomResponseDto> list = chatService.getListAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    @ApiOperation(value = "참여중인 채팅방 목록 가져오기 / 미완료")
    public ResponseEntity<List<RoomResponseDto>> getMyList() {
        List<RoomResponseDto> list = chatService.getListAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "채팅방 검색 목록 가져오기 / 미완료")
    public ResponseEntity<List<RoomResponseDto>> getSearchList() {
        List<RoomResponseDto> list = chatService.getListAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/room")
    @ApiOperation(value = "채팅방 생성 ")
    public ResponseEntity<RoomResponseDto> insertRoom(@RequestBody RoomRequestDto dto) {
        RoomResponseDto response = chatService.registRoom(dto);
//        return new ResponseEntity<>(response, HttpStatus.OK);
        return (response != null) ?
                ResponseEntity.status(HttpStatus.OK).body(response) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/room/{id}")
    @ApiOperation(value = "채팅방 삭제")
    public ResponseEntity<Integer> deleteRoom(@PathVariable int id) {
        chatService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/room/{id}")
    @ApiOperation(value = "채팅방 수정")
    public ResponseEntity<RoomResponseDto> updateRoom(@PathVariable int id, @RequestBody RoomRequestDto dto) {
        RoomResponseDto result = chatService.updateRoom(id, dto);
        return result == null ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build() :
                ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/room/{id}")
    @ApiOperation(value = "채팅방 하나 조회")
    public ResponseEntity<RoomResponseDto> getRoom(@PathVariable int id) {
        return new ResponseEntity<>(chatService.getRoom(id), HttpStatus.OK);
    }




}
