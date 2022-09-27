package com.ssafy.chuanione.domain.animation.domain;

import io.swagger.models.auth.In;
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
    private Map<Integer,String> author;
    private Double avg_rating; // float?
    private String content;
    private String content_rating;
    private Map<Integer,String> genres;
    private Map<String,String> highlight_video;
    private Map<Integer,Map<String,String>> images;
    private String img;
    private boolean is_adult;
    private boolean is_ending;
    private String name;
    private String production;
    private Integer series_id;
    private Map<Integer,String> tags;
    private List<Integer> related; //연관애니메이션 id

}

