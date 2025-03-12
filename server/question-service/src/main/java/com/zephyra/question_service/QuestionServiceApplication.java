package com.zephyra.question_service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableEurekaServer
@SpringBootApplication
public class QuestionServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(QuestionServiceApplication.class, args);
	}
}
