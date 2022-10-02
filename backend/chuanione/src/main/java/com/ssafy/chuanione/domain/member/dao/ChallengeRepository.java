package com.ssafy.chuanione.domain.member.dao;

import com.ssafy.chuanione.domain.member.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
}
