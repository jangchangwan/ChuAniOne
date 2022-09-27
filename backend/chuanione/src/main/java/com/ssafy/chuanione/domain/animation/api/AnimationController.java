package com.ssafy.chuanione.domain.animation.api;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.sevice.AnimationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/animation")
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationService animationService;


    @GetMapping("/list.do/{page}")
    @ApiOperation(value = "전체목록-페이지네이션1부터시작")
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

    @GetMapping("/search.do/{page}")
    @ApiOperation(value = "애니메이션 카테고리 & 검색 조회 / 미완성!!")
    public ResponseEntity<Map<String,Object>> getSearchList(@PathVariable int page) {
//        System.out.println("test");
        Map<String, Object> list= animationService.getListAll(page-1);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/like/{id}")
    @ApiOperation(value = "애니메이션 좋아요 (id:애니메이션)/ 미완성!!")
    public ResponseEntity<Void> addAniLike(@PathVariable int id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/dislike/{id}")
    @ApiOperation(value = "애니메이션 싫어요 (id:애니메이션)/ 미완성!!")
    public ResponseEntity<Void> addAniDisLike(@PathVariable int id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/choice/{id}")
    @ApiOperation(value = "애니메이션 찜 (id:애니메이션)/ 미완성!!")
    public ResponseEntity<Void> addAniChoice(@PathVariable int id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/about.do/{id}")
    @ApiOperation(value = "해당 애니메이션 찜&좋아요&싫어요 여부 (id:애니메이션)/ 미완성!! / 나중에 .do 없애기")
    public ResponseEntity<Void> getAboutAni(@PathVariable int id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
