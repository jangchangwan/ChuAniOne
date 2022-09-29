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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reivew")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/list.do/{id}")
    @ApiOperation(value = "리뷰 전체 조회 (id:애니메이션)")
    public ResponseEntity<List<ReviewResponseDto>> getList(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getList(id), HttpStatus.OK);
    }

    @PostMapping("/insert/{id}")
    @ApiOperation(value = "리뷰 작성 (id:애니메이션)")
    public ResponseEntity<ReviewResponseDto> insertReview(@RequestBody ReviewRequestDto dto, @PathVariable int id) {
        return new ResponseEntity<>(reviewService.insertReview(dto, id),HttpStatus.OK);
    }

    @PatchMapping("/insert/{id}")
    @ApiOperation(value = "리뷰 수정 (id:리뷰)")
    public ResponseEntity<ReviewResponseDto> updateReview(@RequestBody ReviewRequestDto dto, @PathVariable int id) {
        return new ResponseEntity<>(reviewService.updateReview(dto, id),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "리뷰 삭제 (id:리뷰)")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }





}
