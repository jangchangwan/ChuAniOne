package com.ssafy.chuanione.domain.member.dao;

import com.ssafy.chuanione.domain.member.domain.EmailToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailTokenRepository extends JpaRepository<EmailToken, String> {
    //만료되지 않았고 현재보다 이후에 만료되는 토큰ID정보를 가져옴
    Optional<EmailToken> findByIdAndExpirationDateAfterAndExpired(String emailTokenId, LocalDateTime now, boolean expired);
}
