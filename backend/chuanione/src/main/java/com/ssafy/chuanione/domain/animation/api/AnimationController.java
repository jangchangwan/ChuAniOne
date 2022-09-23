package com.ssafy.chuanione.domain.animation.api;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.sevice.AnimationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/animation")
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationService animationService;


    @GetMapping("/list.do")
    @ApiOperation(value = "전체목록/ 테스트용")
    public ResponseEntity<List<Animation>> getListAll() {
        System.out.println("test");
        List<Animation> list = animationService.getListAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
