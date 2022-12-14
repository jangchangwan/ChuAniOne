package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.EmailTokenRepository;
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
@Transactional
public class EmailService {

    private final EmailTokenService emailTokenService;
    private final MemberRepository memberRepository;
    private final EmailTokenRepository emailTokenRepository;


    public boolean confirmEmail(String token){
        EmailToken emailToken = emailTokenService.findByIdAndExpirationDateAfterAndExpired(token);
        Optional<Member> member = memberRepository.findById(emailToken.getMemberId());
        emailToken.setTokenToUsed();
        emailTokenRepository.save(emailToken).isExpired();
        //등록된 토큰에 회원이 있다면 verify를 true로 변경
        if(member.isPresent()){
            Member verifyMember = member.get();
            verifyMember.setVerified();
            memberRepository.save(verifyMember);
            return true;
        }else{
            throw new TokenNotFoundException();
        }
    }
}
