package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.Role;
import com.ssafy.chuanione.domain.member.dto.MemberResponseDto;
import com.ssafy.chuanione.domain.member.dto.SignUpRequestDto;
import com.ssafy.chuanione.domain.member.exception.DuplicateEmailException;
import com.ssafy.chuanione.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public MemberResponseDto doSignUp(SignUpRequestDto requestDto) {
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

        return MemberResponseDto.from(memberRepository.save(member));
    }
}
