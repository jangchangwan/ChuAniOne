package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.dto.GenresResponseDto;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.dto.MyPageResponseDto;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.review.dao.ReviewRepository;
import com.ssafy.chuanione.domain.review.domain.Review;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import com.ssafy.chuanione.domain.voca.dao.MemorizeVocaRepository;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.MemorizeResponseDto;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final MemberRepository memberRepository;
    private final AnimationTypeRepository aniTypeRepository;
    private final AnimationRepository animationRepository;
    private final ReviewRepository reviewRepository;
    private final MemorizeVocaRepository memorizeVocaRepository;


    // 회원 정보
    public MyPageResponseDto getMyInfo() {
        System.out.println("토큰 " + SecurityUtil.getCurrentUsername());
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<Map.Entry<String, Integer>> genres = getGenres();
        return MyPageResponseDto.from(member, genres);
    }

    // 경험치

    // 상위 6개 장르
    public List<Map.Entry<String, Integer>> getGenres(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // 시청한 애니 아이디
        List<AnimationType> watchIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 4);
        // 애니 아이디로 애니메이션 정보 가져와서
        List<Animation> animations = animationRepository.findAllByQuery(getAnimationId(watchIds));
        // 장르만 반환
        List<GenresResponseDto> genres = animations.stream().map(GenresResponseDto::from).collect(Collectors.toList());
        // 장르 합치기
        List<String> genresList = genres.stream().flatMap(x -> x.getGenres().stream()).collect(Collectors.toList());

        Map<String, Integer> map = new HashMap<>();

        // 장르 빈도수 확인
        Set<String> set = new HashSet<>(genresList);
        for(String str: set){
            map.put(str, Collections.frequency(genresList, str));
        }

        // 장르 빈도순 정렬
        List<Map.Entry<String, Integer>> entryList = new LinkedList<>(map.entrySet());
        entryList.sort(Map.Entry.comparingByValue());
        entryList.sort((o1, o2) -> map.get(o2.getKey()) - map.get(o1.getKey()));

        // 장르가 6개 이상이면 6개만 반환
        if(entryList.size() > 6) entryList = new ArrayList<>(entryList.subList(0, 6));

        System.out.println(entryList);

        // 혹시 Map<String, Integer>로 변환 요청 있을 시 사용
//        Map<String, Integer> resultMap = new HashMap<>();
//        for(Map.Entry<String, Integer> entry: entryList){
//            resultMap.put(entry.getKey(), entry.getValue());
//        }
//        System.out.println(resultMap);

        return entryList;
    }

    // 애니 내역 - 메인
    public Map<String, Object> getMyAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // 좋아요한 애니 아이디
        List<AnimationType> likeIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 1);
        // 찜한 애니 아이디
        List<AnimationType> choiceIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 3);
        // 시청한 애니 아이디
        List<AnimationType> watchIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 4);
        System.out.println(likeIds.get(0));
        // 각 리스트로 받아옴
        List<Animation> likePage = animationRepository.findAllByQuery(getAnimationId(likeIds));
        List<Animation> choicePage = animationRepository.findAllByQuery(getAnimationId(choiceIds));
        List<Animation> watchPage = animationRepository.findAllByQuery(getAnimationId(watchIds));
        System.out.println(likePage.size());
        Map<String, Object> result = new HashMap<>();
        result.put("like", likePage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        result.put("choice", choicePage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        result.put("watch", watchPage.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));

        return result;
    }

    // 시청한 애니 더보기
    public Map<String, Object> getWatchAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // 시청한 애니 아이디
        List<AnimationType> watchIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 4);
        // 각 리스트로 받아옴
        return getAniTypeList("watch", watchIds);
    }

    // 좋아요한 애니 더보기
    public Map<String, Object> getLikeAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // 시청한 애니 아이디
        List<AnimationType> likeIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 1);
        // 각 리스트로 받아옴
        return getAniTypeList("like", likeIds);
    }

    // 찜한 애니 더보기
    public Map<String, Object> getChoiceAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // 찜한 애니 아이디
        List<AnimationType> choiceIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 3);
        // 각 리스트로 받아옴
        return getAniTypeList("choice", choiceIds);
    }

    // 리뷰
    public List<ReviewResponseDto> getMyReview(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<Review> review = reviewRepository.findAllByMemberId(member);
        return review.stream().map(ReviewResponseDto::from).collect(Collectors.toList());
    }

    // 보카 내역
    public Map<String, Object> getMyVoca(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<MemorizeVoca> myVoca = memorizeVocaRepository.findAllByMemberId(member);
        List<MemorizeResponseDto> vocaList = myVoca.stream().map(MemorizeResponseDto::from).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("myVoca", vocaList);
        result.put("totalCnt", myVoca.size());
        return result;
    }

    // 경험치 history

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // 중복 코드 묶음(애니메이션 목록, 총 갯수 반환)
    public Map<String, Object> getAniTypeList(String type, List<AnimationType> ids){
        // 애니메이션 아이디로 정보 목록 가져오기
        List<Animation> aniList = animationRepository.findAllByQuery(getAnimationId(ids));
        Map<String, Object> result = new HashMap<>();
        result.put(type, aniList.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        // 반환된 애니메이션 수
        result.put("totalCnt", aniList.size());
        return result;
    }

    // 타입별 애니메이션 아이디 얻기
    public int[] getAnimationId(List<AnimationType> myAniList){
        List<Integer> temp = new ArrayList<>();
        for(AnimationType myAni : myAniList){
            temp.add(myAni.getAnimationId());
        }
        return temp.stream().mapToInt(Integer::intValue).toArray();
    }
}
