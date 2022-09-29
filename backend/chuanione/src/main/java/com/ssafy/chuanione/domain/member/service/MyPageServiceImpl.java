package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.dto.MemberResponseDto;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.voca.dao.MemorizeVocaRepository;
import com.ssafy.chuanione.domain.voca.dto.MemorizeResponseDto;
import com.ssafy.chuanione.domain.voca.dto.MyVocaJoinInterface;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl {

    private final MemberRepository memberRepository;
    private final AnimationTypeRepository aniTypeRepository;
    private final AnimationRepository animationRepository;
    private final MemorizeVocaRepository memorizeVocaRepository;

    // 회원 정보
    public MemberResponseDto getMyInfo() {
        System.out.println("토큰 " + SecurityUtil.getCurrentUsername());
        return MemberResponseDto.from(SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new));
    }

    // 경험치
    // 상위 6개 장르

    // 애니 내역 - 메인
    public Map<String, Object> getMyAni(int memberId){
        // 시청한 애니 아이디
        List<AnimationType> watchIds = aniTypeRepository.findTop8ByMemberId_IdAndTypeOrderByIdDesc(memberId, 4);
        // 좋아요한 애니 아이디
        List<AnimationType> likeIds = aniTypeRepository.findTop8ByMemberId_IdAndTypeOrderByIdDesc(memberId, 1);
        // 찜한 애니 아이디
        List<AnimationType> wishIds = aniTypeRepository.findTop8ByMemberId_IdAndTypeOrderByIdDesc(memberId, 3);

        // 각 리스트로 받아옴
        List<Animation> watchPage = animationRepository.findAllByQuery(getAnimationId(watchIds));
        List<Animation> likePage = animationRepository.findAllByQuery(getAnimationId(likeIds));
        List<Animation> wishPage = animationRepository.findAllByQuery(getAnimationId(wishIds));

        Map<String, Object> result = new HashMap<>();
        result.put("watch", watchPage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        result.put("like", likePage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        result.put("wish", wishPage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));

        return result;
    }

    // 리뷰

    // 보카 내역
    public Map<String, Object> getMyVoca(int memberId, Pageable pageable){
        Page<MyVocaJoinInterface> vocaPage = memorizeVocaRepository.findAllByMemberId(memberId, pageable);
        List<MemorizeResponseDto> vocaList = vocaPage.stream().map(MemorizeResponseDto::from).collect(Collectors.toList());
        long totalCnt = vocaPage.getTotalElements();

        Map<String, Object> result = new HashMap<>();
        result.put("myVoca", vocaList);
        result.put("totalCnt", totalCnt);

        return result;
    }

    // 경험치 history


    // 타입별 애니메이션 아이디 얻기
    public int[] getAnimationId(List<AnimationType> myAniList){
        System.out.println("[MyPageService] getAnimationId");
        List<Integer> temp = new ArrayList<>();
        for(AnimationType myAni : myAniList){
            temp.add(myAni.getId());
        }
        int[] result = temp.stream().mapToInt(Integer::intValue).toArray();
        return result;
    }
}
