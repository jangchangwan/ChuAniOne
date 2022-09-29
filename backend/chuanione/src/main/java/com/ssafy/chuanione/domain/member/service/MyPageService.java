package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dto.MemberResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface MyPageService {
    // 회원 정보
    public MemberResponseDto getMyInfo();
    // 경험치
    // 상위 6개 장르

    // 애니 내역 - 메인
    public Map<String, Object> getMyAni(int memberId);
    // 시청한 애니 - 더보기
    public Map<String, Object> getWatchAni(int memberId, Pageable page);
    // 좋아요한 애니 - 더보기
    public Map<String, Object> getLikeAni(int memberId, Pageable page);
    // 찜한 애니 더보기
    public Map<String, Object> getWishAni(int memberId, Pageable page);

    // 리뷰

    // 경험치 history

    // 보카 내역
    public Map<String, Object> getMyVoca(int memberId, Pageable pageable);
}
