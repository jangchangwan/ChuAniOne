package com.ssafy.chuanione.domain.member.dao;

import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
