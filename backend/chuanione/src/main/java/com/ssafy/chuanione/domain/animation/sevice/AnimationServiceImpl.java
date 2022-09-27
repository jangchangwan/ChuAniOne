package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.dto.AnimationSearchRequestDto;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.global.util.SecurityUtil;
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

    private final MemberRepository memberRepository;

    private final AnimationTypeRepository animationTypeRepository;

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

    @Override
    public Animation getDetail(int id){
        Animation ani = animationRepository.getAnimationBy_id(id);
//        Animation temp = animationRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        return ani;
    }

    @Override
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

    @Override
    public Map<String, Object> getSearchList(int page, AnimationSearchRequestDto dto) {
        List<String> genres = dto.getGenres();
        String keyword = dto.getKeyword();
        List<String> tags = dto.getTags();
//        Page<Animation> roomPage = animationRepository.findSearch(PageRequest.of(page,12), genres.get(0), genres.get(1), genres.get(2), tags.get(0), tags.get(1), tags.get(2), keyword);
        Page<Animation> roomPage = animationRepository.findSearch(genres,tags,keyword,PageRequest.of(page,12));
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

    @Override
    public void addAniLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animation_id(id)
                .member_id(login)
                .type(1)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void addAniDisLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animation_id(id)
                .member_id(login)
                .type(2)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void addAniChoice(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animation_id(id)
                .member_id(login)
                .type(3)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void deleteAniLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,1);
        animationTypeRepository.delete(type);
    }

    @Override
    public void deleteAniDisLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,2);
        animationTypeRepository.delete(type);
    }

    @Override
    public void deleteAniChoice(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,3);
        animationTypeRepository.delete(type);
    }

    @Override
    public Map<String, Boolean> getAboutAni(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Map<String,Boolean> map = new HashMap<>();
        boolean like = false;
        boolean dislike = false;
        boolean choice = false;
        if(animationTypeRepository.findType(login.getId(),id,1) != null){
            like = true;
        }
        if(animationTypeRepository.findType(login.getId(),id,2) != null){
            dislike = true;
        }
        if(animationTypeRepository.findType(login.getId(),id,3) != null){
            choice = true;
        }
        map.put("like",like);
        map.put("dislike",dislike);
        map.put("choice",choice);
        return map;
    }

}
