package com.ssafy.chuanione.domain.talktalk.api;

import com.ssafy.chuanione.domain.talktalk.dto.TalktalkRequestDto;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkResponseDto;
import com.ssafy.chuanione.domain.talktalk.service.TalktalkService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/room")
public class TalktalkController {

    private final TalktalkService talktalkService;

    @GetMapping("/list.do")
    @ApiOperation(value = "톡톡 전체 조회")
    public ResponseEntity<List<TalktalkResponseDto>> getList() {
        return new ResponseEntity<>(talktalkService.getList(),HttpStatus.OK);
    }

    @PostMapping("/insert.do")
    @ApiOperation(value = "톡톡 작성 // 테스트용으로 .do")
    public ResponseEntity<TalktalkResponseDto> insertTalk(@RequestBody TalktalkRequestDto dto) {
        return new ResponseEntity<>(talktalkService.insertTalk(dto),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete.do/{id}")
    @ApiOperation(value = "톡톡 삭제 / (id:톡톡) // 테스트용으로 .do")
    public ResponseEntity<Void> deleteTalk(@PathVariable int id) {
        talktalkService.deleteTalk(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
