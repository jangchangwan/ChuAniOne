package com.ssafy.chuanione.domain.member.api;


import com.ssafy.chuanione.domain.member.dto.*;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.member.service.EmailService;
import com.ssafy.chuanione.domain.member.service.EmailTokenService;
import com.ssafy.chuanione.domain.member.service.MemberService;
import com.ssafy.chuanione.domain.member.service.MyPageServiceImpl;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import com.ssafy.chuanione.global.error.exception.InvalidParameterException;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;
    private final EmailTokenService emailTokenService;
    private final PasswordEncoder passwordEncoder;
    private final MyPageServiceImpl myPageService;

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

    @PatchMapping("/findPw.do")
    @ApiOperation(value = "비밀번호 찾기")
    public ResponseEntity<String> findPw(@RequestBody Map<String, String> map){
        String email = map.get("email");
        try{
            if(!memberService.checkEmail(email) || !memberService.checkBirth(map.get("birthday")))
                throw new MemberNotFoundException();
            String newPw = emailTokenService.changePasswordMessage(email);
            memberService.changePw(email, passwordEncoder.encode(newPw));

            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch (MemberNotFoundException e){
            e.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.NO_CONTENT);
    }


    @PatchMapping("/update/{id}")
    @ApiOperation(value = "회원 정보 수정")
    public ResponseEntity<String> updateMember(@PathVariable int id, @RequestBody UpdateRequestDto requestDto){
        memberService.updateMember(id, requestDto);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/myinfo")
    @ApiOperation(value = "내 정보 보기")
    public ResponseEntity<MyPageResponseDto> getMyInfo(){
        return new ResponseEntity<>(myPageService.getMyInfo(), HttpStatus.OK);
    }

    @GetMapping("/ani")
    @ApiOperation(value = "애니 내역(좋아요, 찜, 시청) - 메인")
    public ResponseEntity<Map<String, Object>> getMyAni(){
        return new ResponseEntity<>(myPageService.getMyAni(), HttpStatus.OK);
    }

    @GetMapping("/ani/like")
    @ApiOperation(value = "좋아요한 애니 목록 전체")
    public ResponseEntity<Map<String, Object>> getLikeAni(){
        return new ResponseEntity<>(myPageService.getLikeAni(), HttpStatus.OK);
    }

    @GetMapping("/ani/watch")
    @ApiOperation(value = "시청한 애니 목록 전체")
    public ResponseEntity<Map<String, Object>> getWatchAni(){
        return new ResponseEntity<>(myPageService.getWatchAni(), HttpStatus.OK);
    }

    @GetMapping("/ani/choice")
    @ApiOperation(value = "찜한 애니 목록 전체")
    public ResponseEntity<Map<String, Object>> getChoiceAni(){
        return new ResponseEntity<>(myPageService.getChoiceAni(), HttpStatus.OK);
    }

    @GetMapping("/review")
    @ApiOperation(value = "내가 쓴 리뷰 전체")
    public ResponseEntity<List<ReviewResponseDto>> getMyReview(){
        return new ResponseEntity<>(myPageService.getMyReview(), HttpStatus.OK);
    }

    @GetMapping("/voca")
    @ApiOperation(value = "내 단어 목록")
    public ResponseEntity<Map<String, Object>> getMyVoca() {
        // 한 페이지에 8개씩, 첫 페이지의 인덱스: 0
        Map<String, Object> result = myPageService.getMyVoca();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
