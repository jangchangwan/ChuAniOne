package com.ssafy.chuanione.domain.animation.api;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
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
import java.util.Map;


@RestController
@RequestMapping("/api/v1/animation")
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationService animationService;


    @GetMapping("/list.do/{page}")
    @ApiOperation(value = "전체목록/ 테스트용")
    public ResponseEntity<Map<String,Object>> getListAll(@PathVariable int page) {
//        System.out.println("test");
        Map<String, Object> list= animationService.getListAll(page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @GetMapping("/detail.do/{id}")
    @ApiOperation(value = "애니메이션 상세조회 (id:애니메이션)")
    public ResponseEntity<Animation> getDetail(@PathVariable int id) {
        return new ResponseEntity<>(animationService.getDetail(id), HttpStatus.OK);
    }


    @GetMapping("/relation.do/{id}")
    @ApiOperation(value = "비슷한 작품 조회 (id:애니메이션)")
    public ResponseEntity<List<AnimationResponseDto>> getAniRelation(@PathVariable int id) {
        return new ResponseEntity<>(animationService.getAniRelation(id), HttpStatus.OK);
    }

}
