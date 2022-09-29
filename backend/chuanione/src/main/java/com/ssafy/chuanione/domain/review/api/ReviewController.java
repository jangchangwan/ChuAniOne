package com.ssafy.chuanione.domain.review.api;

import com.ssafy.chuanione.domain.review.dto.ReviewRequestDto;
import com.ssafy.chuanione.domain.review.dto.ReviewResponseDto;
import com.ssafy.chuanione.domain.review.service.ReviewService;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkRequestDto;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/list.do/{id}")
    @ApiOperation(value = "리뷰 전체 조회 (id:애니메이션)")
    public ResponseEntity<Map<String, Object>> getList(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getList(id), HttpStatus.OK);
    }

    @PostMapping("/insert/{id}")
    @ApiOperation(value = "리뷰 작성 (id:애니메이션) / NO 리턴되면 이미 작성된 리뷰가 있음")
    public ResponseEntity<Object> insertReview(@RequestBody ReviewRequestDto reviewRequestDto, @PathVariable int id) {
        return new ResponseEntity<>(reviewService.insertReview(reviewRequestDto, id),HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    @ApiOperation(value = "리뷰 수정 (id:리뷰)")
    public ResponseEntity<ReviewResponseDto> updateReview(@RequestBody ReviewRequestDto reviewRequestDto, @PathVariable int id) {
        return new ResponseEntity<>(reviewService.updateReview(reviewRequestDto, id),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "리뷰 삭제 (id:리뷰)")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/my/{id}")
    @ApiOperation(value = "리뷰 자기꺼 조회 (id:애니메이션) / NO 리턴되면 작성한 리뷰가 없는것")
    public ResponseEntity<Object> getMyReview(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getMyReview(id), HttpStatus.OK);
    }




}
