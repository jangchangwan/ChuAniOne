package com.ssafy.chuanione.domain.animation.dto;

import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "AnimationTypeResponseDto", description = "유저-애니 기록 응답 Dto")
public class AnimationTypeResponseDto {
    private Integer animationId;
    private Integer type;

    public static AnimationTypeResponseDto from(AnimationType animationType){
        if(animationType == null) return null;
        return AnimationTypeResponseDto.builder()
                .animationId(animationType.getId())
                .type(animationType.getType())
                .build();
    }
}
