package com.ssafy.chuanione.domain.voca.service;

import com.ssafy.chuanione.domain.voca.domain.BigVocaMongo;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;


public interface BigVocaService {

    // 빅보카 전체 단어(1000개)
    List<BigVocaResponseDto> getList(Pageable pageable) ;
    
    
    //단어 체크
    MemorizeVoca insertMyVoca(int id);
    //단어 체크 삭제
    void deleteMyVoca(int id);

    Map<Integer, Map<String, String>> getMemberVoca();

    void test();
}
