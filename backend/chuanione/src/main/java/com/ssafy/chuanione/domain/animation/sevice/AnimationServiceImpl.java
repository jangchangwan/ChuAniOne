package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    @Override
    public Map<String,Object> getListAll(int page){
        Page<Animation> roomPage =animationRepository.findAll(PageRequest.of(page,12));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<Animation> anis = roomPage.getContent();
        List<AnimationResponseDto> dtoList = new ArrayList<>();
        for (Animation ani : anis){
            dtoList.add(AnimationResponseDto.from(ani));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",dtoList);
        return map;
    }

    public Animation getDetail(int id){
        Animation ani = animationRepository.getAnimationBy_id(id);
//        Animation temp = animationRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        return ani;
    }

    public List<AnimationResponseDto> getAniRelation(int id){
        // 비슷한 작품 id 얻어오기
        Animation animation = animationRepository.getRelationBy_id(id);
        List<Integer> nums = animation.getRelated();
        List<AnimationResponseDto> list = new ArrayList<>();
        for (int num  : nums) {
//            int num = animation.getAni_id();
            Animation ani = animationRepository.getAnimationBy_id(num);
            list.add(AnimationResponseDto.from(ani));
        }
       return list;
    }

}
