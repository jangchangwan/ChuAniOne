package com.ssafy.chuanione.domain.voca.domain;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Getter
@Document(collection = "ani_voca")
@ToString
@Setter
@Data
public class BigVocaMongo {

    private String series_id;
    private Map<Integer, String> ani_id;
    private Map<Integer, Map<String, String>> words;
}
