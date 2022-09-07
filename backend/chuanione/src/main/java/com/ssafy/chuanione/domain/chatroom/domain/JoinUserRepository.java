package com.ssafy.chuanione.domain.chatroom.domain;

import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Column;

public interface JoinUserRepository extends JpaRepository<JoinUser, Long> {



}
