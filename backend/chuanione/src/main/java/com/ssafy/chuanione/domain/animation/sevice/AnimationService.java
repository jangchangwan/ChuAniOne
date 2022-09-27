package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;

import java.util.List;
import java.util.Map;

public interface AnimationService {
    Map<String, Object> getListAll(int page);
    Animation getDetail(int id);
    List<AnimationResponseDto> getAniRelation(int id);
    //////////////
    void addAniLike(int id);
    void addAniDisLike(int id);
    void addAniChoice(int id);

    void deleteAniLike(int id);
    void deleteAniDisLike(int id);
    void deleteAniChoice(int id);

    Map<String,Boolean> getAboutAni(int id);
}
