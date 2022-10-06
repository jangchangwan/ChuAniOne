package com.ssafy.chuanione.domain.animation.sevice;

import com.ssafy.chuanione.domain.animation.dao.AniLogRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.animation.dao.AnimationTypeRepository;
import com.ssafy.chuanione.domain.animation.domain.AniLog;
import com.ssafy.chuanione.domain.animation.domain.Animation;
import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.animation.dto.AnimationResponseDto;
import com.ssafy.chuanione.domain.animation.dto.AnimationSearchRequestDto;
import com.ssafy.chuanione.domain.member.dao.MemberRepository;
import com.ssafy.chuanione.domain.member.domain.Member;
import com.ssafy.chuanione.domain.member.exception.MemberNotFoundException;
import com.ssafy.chuanione.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;

    private final MemberRepository memberRepository;

    private final AnimationTypeRepository animationTypeRepository;
    private final AniLogRepository aniLogRepository;

    private final String[][] categoryArr = {{"판타지", "액션"}, {"드라마", "로맨스"}, {"모험", "무협"}, {"이세계", "판타지"}, {"모험", "SF"}, {"스포츠", "드라마"},
            {"공포", "스릴러"}, {"치유"}, {"음악","로맨스"}, {"음식", "일상"}, {"개그","하렘"}, {"추리"}};

    @Override
    public Map<String, List<Animation>> getMainList(){
        //카테고리별 애니메이션 20개씩 0번부터 11번 (string타입)
        Map<String, List<Animation>> result = new HashMap<>();
        for (int i = 0; i < categoryArr.length; i++) {
            result.put(Integer.toString(i), animationRepository.findByGenres(categoryArr[i], PageRequest.of(0, 10)));
        }
        //사용자 맞춤 추천 애니 리스트에 담기, 추천 값이 있을 경우 12번에 담김
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElse(null);
        if(login == null) return result;
        List<AniLog> aniLog = aniLogRepository.findByMemberId(login.getId() + 6000000);
        if(aniLog.size() > 0){
            int[] recommend = aniLog.get(0).getSurprise();
            List<Animation> ani = animationRepository.findAllByQuery(recommend);
            result.put("12", ani);
        }
        return result;
    }
    @Override
    public Map<String,Object> getListAll(int page){
        Page<Animation> roomPage =animationRepository.findAll(PageRequest.of(page,12));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();
        List<Animation> anis = roomPage.getContent();
        List<AnimationResponseDto> dtoList = new ArrayList<>();
        for (Animation ani : anis){
            dtoList.add(AnimationResponseDto.from(ani));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto",dtoList);
        return map;
    }

    @Override
    public Animation getDetail(int id){
        Animation ani = animationRepository.getAnimationBy_id(id);
//        Animation temp = animationRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        return ani;
    }

    @Override
    public List<AnimationResponseDto> getAniRelation(int id){
        // 비슷한 작품 id 얻어오기
        Animation animation = animationRepository.getRelationBy_id(id);
        List<Integer> nums = animation.getRelated();
        List<AnimationResponseDto> list = new ArrayList<>();
        for (int num  : nums) {
//            int num = animation.getAni_id();
            Animation ani = animationRepository.getAnimationBy_id(num);
            list.add(AnimationResponseDto.from(ani));
        }
       return list;
    }

    @Override
    public Map<String, Object> getSearchList(int page, AnimationSearchRequestDto dto) {
        String[] genres = dto.getGenres();
        String keyword = dto.getKeyword();
        String[] tags = dto.getTags();
        Page<Animation> roomPage=animationRepository.findAll(PageRequest.of(page,12));
        if( genres.length ==0 && tags.length ==0 ){
            roomPage = animationRepository.findSearchAB(keyword,PageRequest.of(page,12));
        }else if ( genres.length ==0 ) {
            roomPage = animationRepository.findSearchB(tags,keyword,PageRequest.of(page,12));
        } else if(tags.length ==0){
            roomPage = animationRepository.findSearchA(genres,keyword,PageRequest.of(page,12));
        } else {
            roomPage = animationRepository.findSearch(genres,tags,keyword,PageRequest.of(page,12));
        }


//        System.out.println("genres");
//        for (int i = 0; i < genres.length; i++) {
//            System.out.println("genres"+i+":"+genres[i]);
//        }
//        System.out.println("tags");
//        for (int i = 0; i < tags.length; i++) {
//            System.out.println("tags"+i+":"+tags[i]);
//        }
//        System.out.println("keyword");
//        System.out.println("keyword :"+keyword);

//        Page<Animation> roomPage = animationRepository.findSearch(PageRequest.of(page,12), genres.get(0), genres.get(1), genres.get(2), tags.get(0), tags.get(1), tags.get(2), keyword);
//        Page<Animation> roomPage = animationRepository.findSearch(genres,PageRequest.of(page,12));
        long totalCount = roomPage.getTotalElements();
        long pageCount = roomPage.getTotalPages();;
        List<Animation> anis = roomPage.getContent();
        List<AnimationResponseDto> dtoList = new ArrayList<>();
        for (Animation ani : anis){
            dtoList.add(AnimationResponseDto.from(ani));
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalCnt",totalCount);
        map.put("pageCnt",pageCount);
        map.put("rDto", anis);
        return map;
    }

    @Override
    public void addAniLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animationId(id)
                .memberId(login)
                .type(1)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void addAniDisLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animationId(id)
                .memberId(login)
                .type(2)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void addAniChoice(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = AnimationType.builder()
                .animationId(id)
                .memberId(login)
                .type(3)
                .build();
        animationTypeRepository.save(type);
    }

    @Override
    public void deleteAniLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,1);
        animationTypeRepository.delete(type);
    }

    @Override
    public void deleteAniDisLike(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,2);
        animationTypeRepository.delete(type);
    }

    @Override
    public void deleteAniChoice(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        AnimationType type = animationTypeRepository.findType(login.getId(),id,3);
        animationTypeRepository.delete(type);
    }

    @Override
    public Map<String, Boolean> getAboutAni(int id) {
        Member login = SecurityUtil.getCurrentUsername().flatMap(memberRepository::findByEmail).orElseThrow(MemberNotFoundException::new);
        Map<String,Boolean> map = new HashMap<>();
        boolean like = false;
        boolean dislike = false;
        boolean choice = false;
        if(animationTypeRepository.findType(login.getId(),id,1) != null){
            like = true;
        }
        if(animationTypeRepository.findType(login.getId(),id,2) != null){
            dislike = true;
        }
        if(animationTypeRepository.findType(login.getId(),id,3) != null){
            choice = true;
        }
        map.put("like",like);
        map.put("dislike",dislike);
        map.put("choice",choice);
        return map;
    }

}
