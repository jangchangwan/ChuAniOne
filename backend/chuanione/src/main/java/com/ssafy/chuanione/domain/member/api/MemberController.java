package com.ssafy.chuanione.domain.member.api;


import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    @GetMapping("/member.do/{id}")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<Integer> doSignUp(@PathVariable int id){
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
