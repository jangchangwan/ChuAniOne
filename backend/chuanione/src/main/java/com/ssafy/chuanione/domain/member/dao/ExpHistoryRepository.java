package com.ssafy.chuanione.domain.member.dao;

import com.ssafy.chuanione.domain.member.domain.ExpHistory;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.enumlist.CommunityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpHistoryRepository extends JpaRepository<ExpHistory, Integer> {

    List<ExpHistory> findByMemberId(Member member);

    void deleteByTypeAndCommunityId(CommunityType type, int communityId);

}
