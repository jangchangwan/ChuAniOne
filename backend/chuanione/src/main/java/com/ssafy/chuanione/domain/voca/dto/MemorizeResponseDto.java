package com.ssafy.chuanione.domain.voca.dto;

import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class MemorizeResponseDto {
    private Integer voca_id;
    private String japanese;
    private String pronunciation;
    private String korean;
    private Integer frequency;

    public static MemorizeResponseDto from(MyVocaJoinInterface voca){
        if(voca == null) return null;

        return MemorizeResponseDto.builder()
                .voca_id(voca.getVoca_id())
                .japanese(voca.getJapanese())
                .pronunciation(voca.getPronunciation())
                .korean(voca.getKorean())
                .frequency(voca.getFrequency())
                .build();
    }
}
