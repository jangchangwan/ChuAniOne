package com.ssafy.chuanione.domain.voca.service;

import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface BigVocaService {

    // 빅보카 전체 단어(1000개)
    List<BigVocaResponseDto> getList(Pageable pageable) ;

}
