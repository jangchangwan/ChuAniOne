package com.ssafy.chuanione.domain.talktalk.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.talktalk.domain.Talktalk;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "TalktalkRequestDto", description = "Talktalk 요청 Dto")
public class TalktalkRequestDto {
    private Integer id;
    private String content;
    private String image; //url
    private LocalDateTime date;
    private Integer writer; //작성자
    private Integer animation;

    public static Talktalk toEntity(TalktalkRequestDto dto, Member member){
        return Talktalk.builder()
                .id(dto.getId())
                .content(dto.getContent())
                .image(dto.getImage())
                .date(dto.getDate())
                .writer(member)
                .animation(dto.getAnimation())
                .build();
    }





}
