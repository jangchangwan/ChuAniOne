package com.ssafy.chuanione.domain.voca.api;

import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import com.ssafy.chuanione.domain.voca.service.BigVocaService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/voca")
@RequiredArgsConstructor
public class BigVocaController {

    private final BigVocaService vocaService;

    @GetMapping("")
    @ApiOperation(value = "단어 전체 목록")
    public ResponseEntity<List<BigVocaResponseDto>> getList(@PageableDefault(size = 8) Pageable pageable) {
        // 한 페이지에 8개씩, 첫 페이지의 인덱스: 0
        return new ResponseEntity<>(vocaService.getList(pageable), HttpStatus.OK);
    }

    ////////////////////////////////////////////////////////////////////////////// Test용 (회원 인증 필요 없게)
    @GetMapping("/list.do")
    @ApiOperation(value = "단어 전체 목록 테스트")
    public ResponseEntity<List<BigVocaResponseDto>> getListTest(@PageableDefault(size = 8) Pageable pageable) {
        // 한 페이지에 8개씩, 첫 페이지의 인덱스: 0
        return new ResponseEntity<>(vocaService.getList(pageable), HttpStatus.OK);
    }
}
