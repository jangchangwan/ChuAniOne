package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.EmailToken;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmailService {

    private final EmailTokenService emailTokenService;
    private final MemberRepository memberRepository;


    public boolean confirmEmail(String token){
        EmailToken emailToken = emailTokenService.findByIdAndExpirationDateAfterAndExpired(token);
        Optional<Member> member = memberRepository.findById(emailToken.getMemberId());
        emailToken.setTokenToUsed();

        if(member.isPresent()){
            Member verifyMember = member.get();
            verifyMember.setVerified();
            return true;
        }else{
            throw new TokenNotFoundException();
        }
    }
}
