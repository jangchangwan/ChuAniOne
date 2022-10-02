package com.ssafy.chuanione.domain.voca.api;

import com.ssafy.chuanione.domain.voca.domain.BigVocaMongo;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import com.ssafy.chuanione.domain.voca.service.BigVocaService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @ApiOperation(value = "단어 전체 목록 테스트용 / 회원인증필요X")
    public ResponseEntity<List<BigVocaResponseDto>> getListTest(@PageableDefault(size = 8) @SortDefault(sort = "frequency", direction = Sort.Direction.DESC) Pageable pageable) {
        // 한 페이지에 8개씩, 첫 페이지의 인덱스: 0
        return new ResponseEntity<>(vocaService.getList(pageable), HttpStatus.OK);
    }


    @PostMapping("/check/{id}")
    @ApiOperation(value = "단어 체크 (id:단어)")
    public ResponseEntity<MemorizeVoca> insertMyVoca(@PathVariable int id) {
        return new ResponseEntity<>(vocaService.insertMyVoca(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "단어 체크 삭제 (id:단어)")
    public ResponseEntity<Void> deleteMyVoca(@PathVariable int id) {
        vocaService.deleteMyVoca(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("test.do")
    public ResponseEntity<List<BigVocaMongo>> test() {
        return new ResponseEntity<>(vocaService.test(),HttpStatus.OK);
    }
}
