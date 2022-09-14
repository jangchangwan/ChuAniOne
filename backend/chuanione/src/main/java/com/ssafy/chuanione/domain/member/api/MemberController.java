package com.ssafy.chuanione.domain.member.api;


import com.ssafy.chuanione.domain.member.dto.MemberResponseDto;
import com.ssafy.chuanione.domain.member.dto.SignUpRequestDto;
import com.ssafy.chuanione.domain.member.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup.do")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<MemberResponseDto> doSignUp(@Valid @RequestBody SignUpRequestDto requestDto){
        System.out.println(requestDto);
        return new ResponseEntity<>(memberService.doSignUp(requestDto), HttpStatus.OK);
    }
}
