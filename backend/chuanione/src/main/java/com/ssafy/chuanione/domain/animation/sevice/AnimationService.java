package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.domain.Animation;

import java.util.List;
import java.util.Map;

public interface AnimationService {
    Map<String, Object> getListAll(int page);
    Animation getDetail(int id);
    List<Animation> getAniRelation(int id);
}
