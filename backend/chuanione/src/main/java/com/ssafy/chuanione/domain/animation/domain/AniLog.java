package com.ssafy.chuanione.domain.animation.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection="ani_log")
@ToString
@Data
public class AniLog {
    private int member_id;
    private int[] recommended;
}
