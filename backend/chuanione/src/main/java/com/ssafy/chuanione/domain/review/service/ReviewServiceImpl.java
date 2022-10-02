package com.ssafy.chuanione.domain.review.service;

import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.member.dao.ExpHistoryRepository;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.ExpHistory;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.enumlist.CommunityType;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.review.dao.ReviewMongoRepository;
import com.ssafy.chuanione.domain.review.dao.ReviewRepository;
import com.ssafy.chuanione.domain.review.domain.Review;
import com.ssafy.chuanione.domain.review.domain.ReviewMongoDB;
import com.ssafy.chuanione.domain.review.dto.ReviewRequestDto;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService{

    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewMongoRepository reviewMongoRepository;
    private final AnimationTypeRepository animationTypeRepository;
    private final ExpHistoryRepository expHistoryRepository;

    @Override
    public Map<String, Object> getList(int id) {//애니메이션id
        List<Review> list = reviewRepository.findByAnimationId(id);
        List<ReviewResponseDto> resList = new ArrayList<>();
        double sum = 0.0;
        for(Review review : list){
            sum += review.getRating();
            resList.add(ReviewResponseDto.from(review));
        }
        int count = list.size(); // 해당 애니메이션의 리뷰 전체 개수
        double rating = sum/count; // 평점
//        System.out.println("평점:"+rating);
        Map<String, Object> map = new HashMap<>();
        map.put("rating",rating);
        map.put("count", count);
        map.put("reviewList",resList);
        return map;
    }

    @Override
    public Object insertReview(ReviewRequestDto dto, int id) {//애니메이션id
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        if( reviewRepository.findByAnimationIdAndMemberId(id, login) != null ){
            // 한번만 작성되게
            return "NO";
        }
        LocalDateTime localDateTime = LocalDateTime.now(); //현재시간
        Review review = dto.toEntity(dto,login,id,localDateTime);
        Review saveReview = reviewRepository.save(review);
        // 몽고디비에 넣기
        ReviewMongoDB db = ReviewMongoDB.builder()
                .profile(review.getMemberId().getId()+6000000)
                .score(review.getRating())
                .content(review.getContent())
                .animation(review.getAnimationId())
                .build();
        reviewMongoRepository.save(db);
        // AnimationType에 type 4로 넣어주기
        AnimationType type = AnimationType.builder()
                .animationId(id)
                .memberId(login)
                .type(4)
                .build();

        //경험치 삽입
        ExpHistory expHistory = ExpHistory.builder()
                .value(10)
                .type(CommunityType.REVIEW)
                .communityId(saveReview.getId())
                .memberId(login)
                .build();
        expHistoryRepository.save(expHistory);

        animationTypeRepository.save(type);
        return ReviewResponseDto.from(review);
    }

    @Override
    public ReviewResponseDto updateReview(ReviewRequestDto dto, int id) { //리뷰id
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Review target = reviewRepository.findById(id).orElse(null);
        LocalDateTime localDateTime = LocalDateTime.now(); //현재시간
        if(target.getMemberId().getId() == login.getId()){
            Review review = dto.toEntity(dto, login, 1, localDateTime);
            target.patch(review);
            reviewRepository.save(target);
        }
        return ReviewResponseDto.from(target);
    }

    @Override
    public void deleteReview(int id) {//리뷰id
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Review review = reviewRepository.findById(id).orElse(null);
        if(login.getId() == review.getMemberId().getId()){
            reviewRepository.delete(review);
            expHistoryRepository.deleteByTypeAndCommunityId(CommunityType.REVIEW, review.getId());
        }
        // AnimationType에 type4 삭제하기
        AnimationType type = animationTypeRepository.findType(login.getId(),review.getAnimationId(),4);
        animationTypeRepository.delete(type);
    }

    @Override
    public Object getMyReview(int ani_id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Review review = reviewRepository.findByAnimationIdAndMemberId(ani_id, login);
        if(review == null) return "NO";
        else return ReviewResponseDto.from(review);
    }
}
