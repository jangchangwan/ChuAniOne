package com.ssafy.chuanione.domain.chatroom.dto;

import com.ssafy.chuanione.domain.chatroom.domain.Chat;
import com.ssafy.chuanione.domain.chatroom.domain.Room;
import com.ssafy.chuanione.domain.member.domain.Member;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Getter
@Builder
@ToString
@ApiModel(value = "ChatResponseDto", description = "chat 응답 Dto")
public class ChatResponseDto {

    private int roomId; //방번호
    private int memberId; // 보낸사람 아이디
    private String memberNickname; // 보낸사람 닉네임
    private String url; //보낸사람 프로필 이미지
    private String message;
    private String sendDate;

//    	@ApiModelProperty(value = "성공 여부 (boolean)")
//	private boolean success;
//
//	@ApiModelProperty(value = "에러 메시지")
//	private String error;

    public static ChatResponseDto from(Chat chat, Member member){
        if(chat == null) return null;

        return ChatResponseDto.builder()
                .roomId(chat.getRoom().getId())
                .memberId(chat.getSender().getId())
                .memberNickname(member.getNickname())
                .url("임시값")
                .message(chat.getMessage())
                .sendDate(datetimeToChatTime(chat.getSendDate()))
                .build();
    }

    private static String datetimeToChatTime(LocalDateTime t) {
        LocalDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        String chatDay = "";
        String chatTime = t.format(DateTimeFormatter.ofPattern("a h:mm").withLocale(Locale.forLanguageTag("ko")));
        if (t.getYear() != now.getYear()) {
            chatDay += t.getYear() + ". ";
        } else if (t.getDayOfYear() == now.getDayOfYear()) {
            return chatTime;
        }
        return chatDay + t.getMonthValue() + ". " + t.getDayOfMonth() + ". " + chatTime;
    }

}
