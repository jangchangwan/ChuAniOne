package com.ssafy.chuanione.domain.talktalk.dto;

import com.ssafy.chuanione.domain.talktalk.domain.Talktalk;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "TalktalkResponseDto", description = "Talktalk 응답 Dto")
public class TalktalkResponseDto {

    private Integer id;
    private String content;
    private String image; //url
    private LocalDateTime date;
    private Integer writer_id; //작성자
    private String writer_name; //작성자 닉네임
    private Integer animation;


    public static TalktalkResponseDto from(Talktalk talk){
        if(talk == null ) return null;

        return TalktalkResponseDto.builder()
                .id(talk.getId())
                .content(talk.getContent())
                .image(talk.getImage())
                .date(talk.getDate())
                .writer_id(talk.getWriter().getId())
                .writer_name(talk.getWriter().getNickname())
                .animation(talk.getAnimation())
                .build();
    }
}
