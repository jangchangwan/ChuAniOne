package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                .map(member -> createMember(member))
                .orElseThrow(() -> new UsernameNotFoundException(email + " -> DB에서 찾을 수 없습니다."));

    }

    private User createMember(Member member) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(member.getRole().toString()));

        return new User(member.getEmail(), member.getPassword(), grantedAuthorities);
    }
}
