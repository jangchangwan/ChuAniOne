package com.ssafy.chuanione;

import com.ssafy.chuanione.domain.animation.dao.AnimationRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableJpaAuditing
@EnableMongoRepositories(basePackageClasses = AnimationRepository.class)
public class ChuanioneApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChuanioneApplication.class, args);
	}

}
