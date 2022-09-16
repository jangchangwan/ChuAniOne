package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.Role;
import com.ssafy.chuanione.domain.member.dto.*;
import com.ssafy.chuanione.domain.member.exception.DuplicateEmailException;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.global.jwt.TokenProvider;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final EmailTokenService emailTokenService;
    public MemberResponseDto doSignUp(SignUpRequestDto requestDto) throws Exception {
        // Login id/pw로 AuthenticationToken 생성
        if(memberRepository.findByEmail(requestDto.getEmail()).orElse(null) != null){
            throw new DuplicateEmailException();
        }
        Role role = Role.ROLE_USER;

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .nickname(requestDto.getNickname())
                .birthday(requestDto.getBirthday())
                .gender(requestDto.getGender())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .introduction(requestDto.getIntroduction())
                .role(role)
                .build();
        //가입시 메일 전송
        Member result = memberRepository.save(member);
        emailTokenService.createEmailToken(result.getId(), result.getEmail());
        return MemberResponseDto.from(result);
    }

    public TokenDto doLogin(LoginRequestDto requestDto) {
        // Login id/pw로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());
        // 검증 과정
        // CustomUserDetailsService의 loadByUserName 실행
        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.createToken(authentication);

        //Refresh Token 저장
        Optional<Member> member = memberRepository.findByEmail(authentication.getName());

        if(member.isPresent()){
            member.get().saveToken(tokenDto.getRefreshToken());
            memberRepository.save(member.get());
        }

        return tokenDto;
    }

    public Boolean checkNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isPresent();
    }

    public void updateMember(int id, UpdateRequestDto requestDto) {
        Member member = requestDto.toEntity();
        Member target = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
        target.patch(member, passwordEncoder);
        memberRepository.save(target);
        return;
    }

    public MemberResponseDto getMyInfo() {
        System.out.println("토큰 " + SecurityUtil.getCurrentUsername());
        return MemberResponseDto.from(SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new));
    }
}
