package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.dto.GenresResponseDto;
import com.ssafy.chuanione.domain.member.dao.ChallengeRepository;
import com.ssafy.chuanione.domain.member.dao.ExpHistoryRepository;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.ExpHistory;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.dto.MyPageResponseDto;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.review.dao.ReviewRepository;
import com.ssafy.chuanione.domain.review.domain.Review;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import com.ssafy.chuanione.domain.talktalk.domain.Talktalk;
import com.ssafy.chuanione.domain.talktalk.domain.TalktalkRepository;
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
    private final TalktalkRepository talktalkRepository;
    private final MemorizeVocaRepository memorizeVocaRepository;
    private final ExpHistoryRepository expHistoryRepository;
    private final ChallengeRepository challengeRepository;



    // ?????? ??????
    public MyPageResponseDto getMyInfo() {
        System.out.println("?????? " + SecurityUtil.getCurrentUsername());
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<Map.Entry<String, Integer>> genres = getGenres();
        List<ExpHistory> expHistories = expHistoryRepository.findByMemberId(member);

        int exp = 0;
        for (ExpHistory v: expHistories) {
            exp += v.getValue();
        }
        return MyPageResponseDto.from(member, exp, genres);
    }

    // ?????????

    // ?????? 6??? ??????
    public List<Map.Entry<String, Integer>> getGenres(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // ????????? ?????? ?????????
        List<AnimationType> watchIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 4);
        // ?????? ???????????? ??????????????? ?????? ????????????
        List<Animation> animations = animationRepository.findAllByQuery(getAnimationId(watchIds));
        // ????????? ??????
        List<GenresResponseDto> genres = animations.stream().map(GenresResponseDto::from).collect(Collectors.toList());
        // ?????? ?????????
        List<String> genresList = genres.stream().flatMap(x -> x.getGenres().stream()).collect(Collectors.toList());

        Map<String, Integer> map = new HashMap<>();

        // ?????? ????????? ??????
        Set<String> set = new HashSet<>(genresList);
        for(String str: set){
            map.put(str, Collections.frequency(genresList, str));
        }

        // ?????? ????????? ??????
        List<Map.Entry<String, Integer>> entryList = new LinkedList<>(map.entrySet());
        entryList.sort(Map.Entry.comparingByValue());
        entryList.sort((o1, o2) -> map.get(o2.getKey()) - map.get(o1.getKey()));

        // ????????? 6??? ???????????? 6?????? ??????
        if(entryList.size() > 6) entryList = new ArrayList<>(entryList.subList(0, 6));

        System.out.println(entryList);

        // ?????? Map<String, Integer>??? ?????? ?????? ?????? ??? ??????
//        Map<String, Integer> resultMap = new HashMap<>();
//        for(Map.Entry<String, Integer> entry: entryList){
//            resultMap.put(entry.getKey(), entry.getValue());
//        }
//        System.out.println(resultMap);

        return entryList;
    }

    // ?????? ?????? - ??????
    public Map<String, Object> getMyAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // ???????????? ?????? ?????????
        List<AnimationType> likeIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 1);
        // ?????? ?????? ?????????
        List<AnimationType> choiceIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 3);
        // ????????? ?????? ?????????
        List<AnimationType> watchIds = aniTypeRepository.findAllTop8ByMemberIdAndTypeOrderByIdDesc(member, 4);

        // ??? ???????????? ?????????
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

    // ????????? ?????? ?????????
    public Map<String, Object> getWatchAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // ????????? ?????? ?????????
        List<AnimationType> watchIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 4);
        // ??? ???????????? ?????????
        return getAniTypeList("watch", watchIds);
    }

    // ???????????? ?????? ?????????
    public Map<String, Object> getLikeAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // ????????? ?????? ?????????
        List<AnimationType> likeIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 1);
        // ??? ???????????? ?????????
        return getAniTypeList("like", likeIds);
    }

    // ?????? ?????? ?????????
    public Map<String, Object> getChoiceAni(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        // ?????? ?????? ?????????
        List<AnimationType> choiceIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 3);
        // ??? ???????????? ?????????
        return getAniTypeList("choice", choiceIds);
    }

    // ??????
    public List<ReviewResponseDto> getMyReview(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<Review> review = reviewRepository.findAllByMemberId(member);
        return review.stream().map(ReviewResponseDto::from).collect(Collectors.toList());
    }

    // ?????? ??????
    public Map<String, Object> getMyVoca(){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<MemorizeVoca> myVoca = memorizeVocaRepository.findAllByMemberId(member);
        List<MemorizeResponseDto> vocaList = myVoca.stream().map(MemorizeResponseDto::from).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("myVoca", vocaList);
        result.put("totalCnt", myVoca.size());
        return result;
    }

    // ????????? history

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ?????? ?????? ??????(??????????????? ??????, ??? ?????? ??????)
    public Map<String, Object> getAniTypeList(String type, List<AnimationType> ids){
        // ??????????????? ???????????? ?????? ?????? ????????????
        List<Animation> aniList = animationRepository.findAllByQuery(getAnimationId(ids));
        Map<String, Object> result = new HashMap<>();
        result.put(type, aniList.stream().map(AnimationResponseDto::from).collect(Collectors.toList()));
        // ????????? ??????????????? ???
        result.put("totalCnt", aniList.size());
        return result;
    }

    // ????????? ??????????????? ????????? ??????
    public int[] getAnimationId(List<AnimationType> myAniList){
        List<Integer> temp = new ArrayList<>();
        for(AnimationType myAni : myAniList){
            temp.add(myAni.getAnimationId());
        }
        return temp.stream().mapToInt(Integer::intValue).toArray();
    }

    public List<String> getChallenge(){
        List<String> result = new ArrayList<>();
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        //?????? ?????? ????????????
        List<Review> review = reviewRepository.findAllByMemberId(member);
        if(review.size() > 0){
            result.add(challengeRepository.findById(1).get().getName());
        }
        if(review.size() > 2){
            result.add(challengeRepository.findById(2).get().getName());
        }
        //?????? ?????? ????????????
        List<Talktalk> talktalk = talktalkRepository.findAllByWriter(member);
        if(talktalk.size() > 0){
            result.add(challengeRepository.findById(3).get().getName());
        }
        if(talktalk.size() > 2){
            result.add(challengeRepository.findById(4).get().getName());
        }
        //?????? ????????? ????????????
        List<AnimationType> likeIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 1);
        if(likeIds.size() > 0) result.add(challengeRepository.findById(5).get().getName());
        //?????? ????????? ????????????
        List<AnimationType> choiceIds = aniTypeRepository.findAllByMemberIdAndTypeOrderByIdDesc(member, 3);
        if(choiceIds.size() > 0) result.add(challengeRepository.findById(6).get().getName());

        return result;
    }
}
