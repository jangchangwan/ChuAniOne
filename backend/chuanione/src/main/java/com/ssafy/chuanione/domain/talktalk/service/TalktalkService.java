package com.ssafy.chuanione.domain.talktalk.service;

import com.ssafy.chuanione.domain.talktalk.dto.TalktalkRequestDto;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkResponseDto;

import java.util.List;

public interface TalktalkService{
     List<TalktalkResponseDto> getList();
     TalktalkResponseDto insertTalk(TalktalkRequestDto dto);
     void deleteTalk(int id);
}
