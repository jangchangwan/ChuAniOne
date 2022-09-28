package com.ssafy.chuanione.domain.chatroom.api;

import com.ssafy.chuanione.domain.chatroom.domain.Chat;
import com.ssafy.chuanione.domain.chatroom.dto.ChatRequestDto;
import com.ssafy.chuanione.domain.chatroom.dto.ChatResponseDto;
import com.ssafy.chuanione.domain.chatroom.service.ChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
//@RequestMapping("/api/v1/chat")
public class ChatController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    //"/pub/chat/enter"
//    @MessageMapping(value = "/chat/enter")
//    public void enter(ChatRequestDto dto){
//        System.out.println("/chat/enter controller 호출!!!!!!!!!!!!!!!!!!!!!!!");
//        ChatResponseDto chatResponseDto = chatService.enterMessage(dto);
//        template.convertAndSend("/sub/chat/room/" + dto.getRoomId(), chatResponseDto);
//    }

    @MessageMapping(value="/chat/message")
    public void message(ChatRequestDto dto){
        System.out.println("/chat/message controller 호출!!!!!!!!!!!!!!!!!!!!!!!");
        ChatResponseDto chatResponseDto = chatService.sendMessage(dto);
        template.convertAndSend("/sub/chat/room/" + dto.getRoomId(), chatResponseDto);
    }
}
