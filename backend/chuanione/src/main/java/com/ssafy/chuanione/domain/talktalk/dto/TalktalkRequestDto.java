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
    private String content;
    private String image; //url
//    private Integer id; //애니메이션 아이디

    public static Talktalk toEntity(TalktalkRequestDto dto, Member member, int id, LocalDateTime localDateTime){
        return Talktalk.builder()
                .content(dto.getContent())
                .image(dto.getImage())
                .date(localDateTime)
                .writer(member)
                .animation(id)
                .build();
    }





}
