package com.ssafy.chuanione.domain.talktalk.service;

import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.talktalk.domain.Talktalk;
import com.ssafy.chuanione.domain.talktalk.domain.TalktalkRepository;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkRequestDto;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkResponseDto;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TalktalkServiceImpl implements TalktalkService {

    private final TalktalkRepository talktalkRepository;
    private final MemberRepository memberRepository;

    public List<TalktalkResponseDto> getList(int id){
        List<Talktalk> list = talktalkRepository.findByAnimation(id);
        List<TalktalkResponseDto> resList = new ArrayList<>();
        for(Talktalk talk : list){
            resList.add(TalktalkResponseDto.from(talk));
        }
        return resList;
    }
    public TalktalkResponseDto insertTalk(TalktalkRequestDto dto, int id){
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Talktalk talk = dto.toEntity(dto,login, id);
        talktalkRepository.save(talk);
        return TalktalkResponseDto.from(talk);
    }
    public void deleteTalk(int id, int talk_id){
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Talktalk talk = talktalkRepository.findById(id).orElse(null);
        // 로그인한사람과 작성자가 같으면
        if(login.getId() == talk.getWriter().getId()){
            talktalkRepository.delete(talk);
        }
    }
}
