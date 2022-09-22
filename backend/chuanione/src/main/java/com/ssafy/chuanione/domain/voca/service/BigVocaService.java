package com.ssafy.chuanione.domain.voca.service;

import com.ssafy.chuanione.domain.voca.dao.BigVocaRepository;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BigVocaService {

    private final BigVocaRepository bigVocaRepository;

    // 빅보카 전체 단어(1000개)
    public List<BigVocaResponseDto> getList(Pageable pageable) {
        // 단어 목록과 페이지 정보
        Page<BigVoca> bigVocaList = bigVocaRepository.findAll(pageable);
        // 다시 Dto로 변환 후 전달
        return bigVocaList.stream().map(x -> BigVocaResponseDto.from(x)).collect(Collectors.toList());
    }

}
