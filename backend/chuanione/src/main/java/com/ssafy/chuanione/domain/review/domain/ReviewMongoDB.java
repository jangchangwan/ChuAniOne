package com.ssafy.chuanione.domain.review.domain;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@Setter
@ToString
//@Builder
@Data
//@PersistenceConstructor
@Document(collection="ani_review")
public class ReviewMongoDB {
    @Id
    private String _id;
    private int profile;
    private double score;
    private String content;
    private int animation;

    @Builder
    public ReviewMongoDB(int profile, double score, String content, int animation){
        this.profile = profile;
        this.score = score;
        this.content = content;
        this.animation = animation;
    }
}
