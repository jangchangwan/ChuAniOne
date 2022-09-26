package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    @Override
    public Map<String,Object> getListAll(int page){
        Page<Animation> roomPage =animationRepository.findAll(PageRequest.of(page,12));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<Animation> anis = roomPage.getContent();
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",anis);
        return map;
    }

}
