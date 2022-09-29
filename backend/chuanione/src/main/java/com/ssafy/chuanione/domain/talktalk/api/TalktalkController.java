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
@RequestMapping("/api/v1/talk")
public class TalktalkController {

    private final TalktalkService talktalkService;

    @GetMapping("/list.do/{id}")
    @ApiOperation(value = "톡톡 전체 조회 (id:애니메이션)")
    public ResponseEntity<List<TalktalkResponseDto>> getList(@PathVariable(name="애니메이션 id", required=true) int id) {
        return new ResponseEntity<>(talktalkService.getList(id),HttpStatus.OK);
    }

    @PostMapping("/insert/{id}")
    @ApiOperation(value = "톡톡 작성 (id:애니메이션)")
    public ResponseEntity<TalktalkResponseDto> insertTalk(@RequestBody TalktalkRequestDto dto, @PathVariable(name="애니메이션 id", required=true) int id) {
        return new ResponseEntity<>(talktalkService.insertTalk(dto, id),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}/{tid}")
    @ApiOperation(value = "톡톡 삭제 (id:애니메이션), (tid:톡톡)")
    public ResponseEntity<Void> deleteTalk(@PathVariable(name="애니메이션 id", required=true) int id,@PathVariable(name="톡톡 id", required=true) int tid) {
        talktalkService.deleteTalk(id, tid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
