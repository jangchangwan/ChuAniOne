package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;


    public List<Animation> getListAll(){
        return animationRepository.findAll();
    }

}
