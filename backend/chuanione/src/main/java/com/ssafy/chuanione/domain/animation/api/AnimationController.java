package com.ssafy.chuanione.domain.animation.api;

import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.dto.AnimationSearchRequestDto;
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

    @GetMapping("/main.do")
    @ApiOperation(value = "전체 메인")
    public ResponseEntity<Map<String,List<Animation>>> getMainList(){
        return new ResponseEntity<>(animationService.getMainList(), HttpStatus.OK);
    }

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

    @PostMapping("/search.do/{page}")
    @ApiOperation(value = "애니메이션 카테고리 & 검색 조회")
    public ResponseEntity<Map<String,Object>> getSearchList(@PathVariable int page, @RequestBody AnimationSearchRequestDto dto) {
//        System.out.println("test");
        Map<String, Object> list= animationService.getSearchList(page-1,dto);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    ///////////////////////////

    @PostMapping("/like/{id}")
    @ApiOperation(value = "애니메이션 좋아요 등록 (id:애니메이션)")
    public ResponseEntity<Void> addAniLike(@PathVariable int id) {
        animationService.addAniLike(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/dislike/{id}")
    @ApiOperation(value = "애니메이션 싫어요 등록 (id:애니메이션)")
    public ResponseEntity<Void> addAniDisLike(@PathVariable int id) {
        animationService.addAniDisLike(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/choice/{id}")
    @ApiOperation(value = "애니메이션 찜 등록 (id:애니메이션)")
    public ResponseEntity<Void> addAniChoice(@PathVariable int id) {
        animationService.addAniChoice(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/like/{id}")
    @ApiOperation(value = "애니메이션 좋아요 삭제 (id:애니메이션)")
    public ResponseEntity<Void> deleteAniLike(@PathVariable int id) {
        animationService.deleteAniLike(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/dislike/{id}")
    @ApiOperation(value = "애니메이션 싫어요 삭제 (id:애니메이션)")
    public ResponseEntity<Void> deleteAniDisLike(@PathVariable int id) {
        animationService.deleteAniDisLike(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/choice/{id}")
    @ApiOperation(value = "애니메이션 찜 삭제 (id:애니메이션)")
    public ResponseEntity<Void> deleteAniChoice(@PathVariable int id) {
        animationService.deleteAniChoice(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //////////////////////

    @GetMapping("/about/{id}")
    @ApiOperation(value = "해당 애니메이션 찜&좋아요&싫어요 여부 (id:애니메이션) / 시청여부는 확인X")
    public ResponseEntity<Map<String,Boolean>> getAboutAni(@PathVariable int id) {
        return new ResponseEntity<>(animationService.getAboutAni(id),HttpStatus.OK);
    }

}
