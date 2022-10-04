package com.ssafy.chuanione.domain.voca.service;

import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.domain.voca.dao.BigVocaMongoRepository;
import com.ssafy.chuanione.domain.voca.dao.BigVocaRepository;
import com.ssafy.chuanione.domain.voca.dao.MemorizeVocaRepository;
import com.ssafy.chuanione.domain.voca.domain.BigVoca;
import com.ssafy.chuanione.domain.voca.domain.BigVocaMongo;
import com.ssafy.chuanione.domain.voca.domain.MemorizeVoca;
import com.ssafy.chuanione.domain.voca.dto.BigVocaResponseDto;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class BigVocaServiceImpl implements BigVocaService{


    private final MemberRepository memberRepository;

    private final MemorizeVocaRepository memorizeVocaRepository;

    private final BigVocaRepository bigVocaRepository;
    private final BigVocaMongoRepository bigVocaMongoRepository;
    private final AnimationTypeRepository animationTypeRepository;

    public List<BigVocaResponseDto> getList(Pageable pageable) {
        //회원 아이디 받기
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        List<MemorizeVoca> memorizeVoca = memorizeVocaRepository.findAllByMemberId(member);


        Page<BigVoca> bigVocaList;
        if (memorizeVoca.size() != 0) {
            List<Integer> memorizeVocaIds = new ArrayList<>();
            for (MemorizeVoca mem : memorizeVoca) {
                memorizeVocaIds.add(mem.getVocaId().getVocaId());
            }
            // 단어 목록과 페이지 정보
            bigVocaList = bigVocaRepository.findAll(pageable, memorizeVocaIds);
        }else{
            bigVocaList = bigVocaRepository.findAll(pageable);
        }
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


    @Override
    public Map<Integer, Map<String, String>> getMemberVoca(){
//        System.out.println(bigVocaMongoRepository.findByAni_id("37217"));
        Member member = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        //해당 사용자가 작성한 최신 리뷰 조회
        AnimationType animationType = animationTypeRepository.findTopByMemberIdAndTypeOrderByIdDesc(member, 4);
//        List<BigVocaMongo> bigVocaMongos = bigVocaMongoRepository.findByAni_id(37217);
        List<BigVocaMongo> bigVocaMongos = bigVocaMongoRepository.findByAni_id(37217);
        return bigVocaMongos.size() == 0 ? null : bigVocaMongos.get(0).getWords();

    }


    public void test(){
        Map<Integer, Map<String, String>> voca = getMemberVoca();
        for (Integer num: voca.keySet()) {
            BigVoca.builder()
                    .vocaId(bigVocaRepository.findByPronunciation(voca.get(num).get("pronunciation")).getVocaId())
                    .japanese(voca.get(num).get("japanese"))
                    .pronunciation(voca.get(num).get("pronunciation"))
                    .korean(voca.get(num).get("korean"))
                    .frequency(Integer.parseInt(voca.get(num).get("frequency")))
                    .build();
        }
        
    }
}
