package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import com.ssafy.chuanione.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface AnimationTypeRepository  extends JpaRepository<AnimationType, Integer> {

    @Query(nativeQuery = true, value ="SELECT * FROM animation_type where member_id = :memberId and animation_id = :animationId and type = :type")
    AnimationType findType(int memberId, int animationId, int type);

    AnimationType findTopByMemberIdAndTypeOrderByIdDesc(Member member, int type);

    // 마이페이지 바로 보여질 애니 기록(타입별로 8개)
    List<AnimationType> findAllTop8ByMemberIdAndTypeOrderByIdDesc(Member member, int type);

    // 사용자의 애니 기록 전체 목록
    List<AnimationType> findAllByMemberIdAndTypeOrderByIdDesc(Member member, int type);
}
