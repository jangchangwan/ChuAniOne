package com.ssafy.chuanione.domain.talktalk.service;

import com.ssafy.chuanione.domain.talktalk.dto.TalktalkRequestDto;
import com.ssafy.chuanione.domain.talktalk.dto.TalktalkResponseDto;

import java.util.List;
import java.util.Map;

public interface TalktalkService{
     Map<String,Object> getList(int id);
     TalktalkResponseDto insertTalk(TalktalkRequestDto dto, int id);
     void deleteTalk(int id, int talk_id);
}
