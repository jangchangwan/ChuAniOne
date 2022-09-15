package com.ssafy.chuanione.domain.member.api;


import com.ssafy.chuanione.domain.member.dto.*;
import com.ssafy.chuanione.domain.member.exception.TokenNotFoundException;
import com.ssafy.chuanione.domain.member.service.EmailService;
import com.ssafy.chuanione.domain.member.service.MemberService;
import com.ssafy.chuanione.global.error.exception.InvalidParameterException;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    @PostMapping("/signup.do")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<MemberResponseDto> doSignUp(@Valid @RequestBody SignUpRequestDto requestDto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        return new ResponseEntity<>(memberService.doSignUp(requestDto), HttpStatus.OK);
    }

    @PostMapping("/login.do")
    @ApiOperation(value = "로그인")
    public ResponseEntity<TokenDto> doLogin(@Valid @RequestBody LoginRequestDto requestDto, BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }

        TokenDto tokenDto = memberService.doLogin(requestDto);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Auth", tokenDto.getAccessToken());
        headers.add("Refresh", tokenDto.getRefreshToken());

        return new ResponseEntity<>(tokenDto, headers, HttpStatus.OK);
    }

    @GetMapping("/check.do/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickname){
        //중복이면 true 아니면 false
        return new ResponseEntity<>(memberService.checkNickName(nickname), HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    @ApiOperation(value = "회원 정보 수정")
    public ResponseEntity<String> updateMember(@PathVariable int id, @RequestBody UpdateRequestDto requestDto){
        memberService.updateMember(id, requestDto);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/email-confirm.do")
    @ApiOperation(value = "메일 인증")
    public ResponseEntity<Boolean> confirmEmail(String token){
        return new ResponseEntity<>(emailService.confirmEmail(token), HttpStatus.OK);
    }

}
