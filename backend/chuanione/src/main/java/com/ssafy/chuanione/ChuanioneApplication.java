package com.ssafy.chuanione;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import com.ssafy.chuanione.domain.review.dao.ReviewMongoRepository;
import com.ssafy.chuanione.domain.voca.dao.BigVocaMongoRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableAsync;


@EnableAsync
@SpringBootApplication
@EnableJpaAuditing
@EnableMongoRepositories(basePackageClasses = {AnimationRepository.class, ReviewMongoRepository.class, BigVocaMongoRepository.class})
public class ChuanioneApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChuanioneApplication.class, args);
	}

}
