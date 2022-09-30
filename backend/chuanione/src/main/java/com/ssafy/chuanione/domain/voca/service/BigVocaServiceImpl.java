package com.ssafy.chuanione.domain.voca.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.voca.dao.BigVocaRepository;
import com.ssafy.chuanione.domain.voca.dao.MemorizeVocaRepository;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class BigVocaServiceImpl implements BigVocaService{


    private final MemberRepository memberRepository;

    private final MemorizeVocaRepository memorizeVocaRepository;

    private final BigVocaRepository bigVocaRepository;

    public List<BigVocaResponseDto> getList(Pageable pageable) {
        //회원 아이디 받기
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<MemorizeVoca> memorizeVoca = memorizeVocaRepository.findAllByMemberId(member);
        System.out.println("memvoca list size: " + memorizeVoca.size());
        List<Integer> memorizeVocaIds = new ArrayList<>();
        for (MemorizeVoca mem: memorizeVoca) {
            memorizeVocaIds.add(mem.getVocaId().getVocaId());
        }
        // 단어 목록과 페이지 정보
        Page<BigVoca> bigVocaList = bigVocaRepository.findAll(pageable, memorizeVocaIds);

        // 다시 Dto로 변환 후 전달
        return bigVocaList.stream().map(BigVocaResponseDto::from).collect(Collectors.toList());
    }

    //단어 체크
    public MemorizeVoca insertMyVoca(int id){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        BigVoca bigVoca = bigVocaRepository.findById(id).orElse(null);
        MemorizeVoca memorizeVoca =MemorizeVoca.builder()
                .memberId(member)
                .vocaId(bigVoca)
                .build();
        return memorizeVocaRepository.save(memorizeVoca);

    }
    //단어 체크 삭제
    public void deleteMyVoca(int id){
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
//        BigVoca bigVoca = bigVocaRepository.findById(id).orElse(null);
        MemorizeVoca memorizeVoca = memorizeVocaRepository.findByMemberIdAndVocaId(member.getId(),id);
        memorizeVocaRepository.delete(memorizeVoca);
    }


}
