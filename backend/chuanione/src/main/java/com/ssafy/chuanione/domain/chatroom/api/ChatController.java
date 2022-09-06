package com.ssafy.chuanione.domain.chatroom.api;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@MessageMapping("/{roomId}")
//@SendTo("/room/{roomId}")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat/{roomId}")
public class ChatController {
}
