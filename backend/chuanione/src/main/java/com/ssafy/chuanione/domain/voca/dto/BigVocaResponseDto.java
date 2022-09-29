package com.ssafy.chuanione.domain.voca.dto;

import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class BigVocaResponseDto {
    private Integer voca_id;
    private String japanese;
    private String pronunciation;
    private String korean;
    private Integer frequency;

    public static BigVocaResponseDto from(BigVoca voca){
        if(voca == null) return null;

        return BigVocaResponseDto.builder()
                .voca_id(voca.getVoca_id())
                .japanese(voca.getJapanese())
                .pronunciation(voca.getPronunciation())
                .korean(voca.getKorean())
                .frequency(voca.getFrequency())
                .build();
    }
    public static BigVocaResponseDto from(MyVocaJoinInterface voca){
        if(voca == null) return null;

        return BigVocaResponseDto.builder()
                .voca_id(voca.getVoca_id())
                .japanese(voca.getJapanese())
                .pronunciation(voca.getPronunciation())
                .korean(voca.getKorean())
                .frequency(voca.getFrequency())
                .build();
    }

}
