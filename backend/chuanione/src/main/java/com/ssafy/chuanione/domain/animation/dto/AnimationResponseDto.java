package com.ssafy.chuanione.domain.animation.dto;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "AnimationResponseDto", description = "목록용 애니메이션 응답 Dto")
public class AnimationResponseDto {
    
    // 아이디, 이미지, 이름, 19금여부
    private int ani_id;
    private Map<Integer,Map<String,String>> images;
    private String img;
    private boolean is_adult;
    private String name;

    public static AnimationResponseDto from(Animation animation){
        if(animation == null) return null;

        return AnimationResponseDto.builder()
                .ani_id(animation.getAni_id())
                .images(animation.getImages())
                .img(animation.getImg())
                .is_adult(animation.is_adult())
                .name(animation.getName())
                .build();
    }
}
