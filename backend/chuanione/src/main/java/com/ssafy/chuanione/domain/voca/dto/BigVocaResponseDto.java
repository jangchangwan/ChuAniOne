package com.ssafy.chuanione.domain.voca.dto;

import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class BigVocaResponseDto {
    private Integer vocaId;
    private String japanese;
    private String pronunciation;
    private String korean;
    private Integer frequency;

    public static BigVocaResponseDto from(BigVoca voca){
        if(voca == null) return null;

        return BigVocaResponseDto.builder()
                .vocaId(voca.getVocaId())
                .japanese(voca.getJapanese())
                .pronunciation(voca.getPronunciation())
                .korean(voca.getKorean())
                .frequency(voca.getFrequency())
                .build();
    }

}
