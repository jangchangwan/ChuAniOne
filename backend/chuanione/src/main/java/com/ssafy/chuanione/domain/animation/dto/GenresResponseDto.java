package com.ssafy.chuanione.domain.animation.dto;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "AnimationResponseDto", description = "유저-장르 응답 Dto")
public class GenresResponseDto {
    private List<String> genres;
    public static GenresResponseDto from(Animation animation){
        if(animation == null) return null;
        return GenresResponseDto.builder()
                .genres(animation.getGenres())
                .build();
    }
}
