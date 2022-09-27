package com.ssafy.chuanione.domain.animation.domain;

import lombok.*;
import org.bson.json.JsonObject;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Column;
import javax.persistence.Id;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Document(collection="ani_info")
@ToString
//@Builder
@Data
//@PersistenceConstructor
public class Animation {
    @Id
    private String _id;
    @Field("id")
    private int ani_id;
    private String air_year_quarter;
    private List<String> author;
    private Double avg_rating; // float?
    private String content;
    private String content_rating;
    private List<String> genres;
    private Map<String,String> highlight_video;
    private List<String> images;
    private String img;
    private boolean is_adult;
    private boolean is_ending;
    private String name;
    private String production;
    private String series_id;
    private List<String> tags;
    private List<Integer> related; //연관애니메이션 id

}

