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
    private BigVoca voca;

    public static MemorizeResponseDto from(MemorizeVoca voca){
        if(voca == null) return null;
        return MemorizeResponseDto.builder()
                .voca(voca.getVocaId())
                .build();
    }
}
