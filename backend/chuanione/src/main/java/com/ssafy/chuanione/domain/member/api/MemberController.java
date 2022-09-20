package com.ssafy.chuanione.domain.member.api;


import com.ssafy.chuanione.domain.member.dto.*;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import com.ssafy.chuanione.domain.member.service.EmailService;
import com.ssafy.chuanione.domain.member.service.EmailTokenService;
import com.ssafy.chuanione.domain.member.service.MemberService;
import com.ssafy.chuanione.global.error.exception.InvalidParameterException;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;
    private final EmailTokenService emailTokenService;

    @PostMapping("/signup.do")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<MemberResponseDto> doSignUp(@Valid @RequestBody SignUpRequestDto requestDto, BindingResult result) throws Exception {
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        return new ResponseEntity<>(memberService.doSignUp(requestDto), HttpStatus.OK);
    }

    @GetMapping("/email-confirm.do")
    @ApiOperation(value = "메일 인증 확인")
    public ResponseEntity<Boolean> confirmEmail(@RequestParam String token){
        return new ResponseEntity<>(emailService.confirmEmail(token), HttpStatus.OK);
    }

    @GetMapping("/email-send.do/{email}")
    @ApiOperation(value = "인증메일 재발송")
    public ResponseEntity<Boolean> sendEmail(@PathVariable String email) throws Exception {
        emailTokenService.createEmailToken(email);
        return new ResponseEntity<>(memberService.emailConfirmCheck(email), HttpStatus.OK);
    }



    @PostMapping("/login.do")
    @ApiOperation(value = "로그인")
    public ResponseEntity<TokenDto> doLogin(@Valid @RequestBody LoginRequestDto requestDto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        HttpHeaders headers = new HttpHeaders();
        //아이디 비번 틀렸을 때 예외처리
        TokenDto tokenDto = memberService.doLogin(requestDto);

        //메일 인증이 안됐다면 다른곳으로 보낸다.
        if(!memberService.emailConfirmCheck(requestDto.getEmail())){

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        headers.add("Auth", tokenDto.getAccessToken());
        headers.add("Refresh", tokenDto.getRefreshToken());

        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
    }

    @GetMapping("/check.do/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickname){
        //중복이면 true 아니면 false
        return new ResponseEntity<>(memberService.checkNickName(nickname), HttpStatus.OK);
    }

    @GetMapping("/check.do/email/{email}")
    @ApiOperation(value = "이메일 중복 검사")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email){
        //중복이면 true 아니면 false
        return new ResponseEntity<>(memberService.checkEmail(email), HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    @ApiOperation(value = "회원 정보 수정")
    public ResponseEntity<String> updateMember(@PathVariable int id, @RequestBody UpdateRequestDto requestDto){
        memberService.updateMember(id, requestDto);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/myinfo")
    @ApiOperation(value = "내 정보 보기")
    public ResponseEntity<MemberResponseDto> getMyInfo(){
        return new ResponseEntity<>(memberService.getMyInfo(), HttpStatus.OK);
    }

}
