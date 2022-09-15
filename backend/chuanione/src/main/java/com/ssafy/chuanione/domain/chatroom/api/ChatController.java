package com.ssafy.chuanione.domain.chatroom.api;

import com.ssafy.chuanione.domain.chatroom.domain.Chat;
import com.ssafy.chuanione.domain.chatroom.dto.ChatRequestDto;
import com.ssafy.chuanione.domain.chatroom.dto.ChatResponseDto;
import com.ssafy.chuanione.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    //"/pub/chat/enter"
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatRequestDto dto){
//        dto.setMessage(dto.getSender() + "님이 채팅방에 참여하였습니다.");
        List<ChatResponseDto> chats = chatService.getMessages(dto.getRoomId(), dto.getMemberId());

        if (chats != null) {
            for (ChatResponseDto chatRes : chats) {
                template.convertAndSend("/sub/chat/room/" + dto.getRoomId(), dto);
                // db에 저장 안해도되나 ?
            }
        }


    }

    @MessageMapping(value = "/chat/message")
    public void message(ChatRequestDto dto){

        ChatResponseDto chatResponseDto = chatService.sendMessage(dto);

        template.convertAndSend("/sub/chat/room/" + dto.getRoomId(), chatResponseDto);
    }
}
