package com.ssafy.chuanione.domain.member.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.domain.enumlist.Role;
import com.ssafy.chuanione.domain.member.dto.*;
import com.ssafy.chuanione.domain.member.exception.DuplicateEmailException;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.swing.filechooser.FileNameExtensionFilter;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final EmailTokenService emailTokenService;

    private final String uploadPath = System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator;
    private final String uploadFolder = "uploads";


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
        emailTokenService.createEmailToken(result.getEmail());
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
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        //Refresh Token 저장
        Optional<Member> member = memberRepository.findByEmail(authentication.getName());

        if(member.isPresent()){
            member.get().saveToken(tokenDto.getRefreshToken());
            memberRepository.save(member.get());
        }

        return tokenDto;
    }

    public TokenDto refresh(TokenRequestDto requestDto){
        // Refresh Token 검증
        if(!tokenProvider.validateToken(requestDto.getRefreshToken())){
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        // Access Token에서 Id(Email) 가져오기
        Authentication authentication = tokenProvider.getAuthentication(requestDto.getAccessToken());

        // 가져온 ID로 Refresh Token 가져오기
        Member entity = memberRepository.findByEmail(authentication.getName())
                .orElseThrow(()->new RuntimeException("로그아웃된 사용자입니다."));

        String refreshToken = entity.getToken();

        // 일치 검사
        if(!refreshToken.equals(requestDto.getRefreshToken())){
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 새 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // DB 정보 업데이트
        entity.saveToken(tokenDto.getRefreshToken());

        // 토큰 발급
        return tokenDto;
    }

    public boolean checkNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isPresent();
    }

    public boolean checkEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public boolean checkBirth(String birth){
        Optional<Member> member = memberRepository.findByBirthday(birth);
        return member.isPresent();
    }

    public void changePw(String email, String newPw){
        Optional<Member> member = memberRepository.findByEmail(email);

        if(member.isPresent()){
            member.get().changePw(newPw);
            return;
        }
        throw new MemberNotFoundException();
    }

    public void updateMember(int id, UpdateRequestDto requestDto, MultipartFile request) {
        System.out.println("[Service] updateMember");
        Member member = requestDto.toEntity();

        // request에서 파일 받아와서
        MultipartFile profile = request;
        System.out.println(profile);

        // 프로필이 같이 첨부된 경우
        if (!profile.isEmpty()) {
            System.out.println("profile is not empty!!");
            try {
                // 업로드 폴더 접근
                File uploadDir = new File(uploadPath + File.separator + uploadFolder);
                // 없으면 업로드 폴더 생성
                if (!uploadDir.exists()) {
                    try{
                        uploadDir.mkdir();
                        System.out.println("created uploadDir");
                    } catch(Exception e){
                        System.out.println("failed create uploadDir");
                        e.getStackTrace();
                    }
                } else {
                    System.out.println("Aleady exist uploadDir");
                }

                System.out.println("uploadDir: " + uploadDir);

                // 만약 원래 프로필 있으면 해당 프로필 삭제
                String profileUrl = member.getProfile();

                if(profileUrl != null) {
                    File origin = new File(uploadDir, profileUrl);
                    System.out.println(origin.getName());
                    if (origin.exists()) origin.delete();
                }

                // 새로운 프로필 저장
                String profileName = profile.getOriginalFilename();

                System.out.println("profileName: " + profileName);

                UUID uuid = UUID.randomUUID();
                String ext = profileName.substring(profileName.lastIndexOf(".") + 1);
                System.out.println(ext);

                String savingName = uuid + "." + ext;

                System.out.println("savingName: " + savingName);
                File destFile = new File(uploadPath + File.separator + uploadFolder + File.separator + savingName);
                profile.transferTo(destFile);

                System.out.println("destFile: " + destFile);

                // db에 profile 경로 저장
                member = Member.builder()
                        .profile(uploadFolder + "/" + savingName)
                        .nickname(requestDto.getNickname())
                        .introduction(requestDto.getIntroduction())
                        .password(requestDto.getPassword())
                        .build();
                System.out.println(member);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        Member target = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
        target.patch(member, passwordEncoder);
        memberRepository.save(target);

        return;
    }

    public boolean emailConfirmCheck(String email) {
        return memberRepository.findByEmail(email).orElseThrow(MemberNotFoundException::new).isVerified();
    }

}
