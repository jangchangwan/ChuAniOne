package com.ssafy.chuanione.domain.animation.dao;

import com.ssafy.chuanione.domain.animation.domain.AnimationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AnimationTypeRepository  extends JpaRepository<AnimationType, Integer> {

    @Query(nativeQuery = true, value ="SELECT * FROM animation_type where member_id = :member_id and animation_id = :animation_id and type = :type")
    AnimationType findType(int member_id, int animation_id, int type);

}
