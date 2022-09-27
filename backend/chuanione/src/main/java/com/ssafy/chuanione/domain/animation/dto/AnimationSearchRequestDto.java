package com.ssafy.chuanione.domain.animation.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "AnimationSearchRequestDto", description = "검색용 애니메이션 요청 Dto")
public class AnimationSearchRequestDto {
    private String keyword; // 검색단어 
    private List<String> genres; // 체크된 장르
    private List<String> tags; // 체크된 태그
}
