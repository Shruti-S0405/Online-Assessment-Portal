package com.zephyra.quiz_service.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.zephyra.quiz_service.DTO.QuestionWrapper;
import com.zephyra.quiz_service.DTO.QuizDto;
import com.zephyra.quiz_service.Model.Response;
import com.zephyra.quiz_service.service.QuizService;

@RestController

@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestBody QuizDto quizDto){
        return quizService.createQuiz(quizDto.getCategoryName(), quizDto.getNumQuestions(), quizDto.getTitle());
    }

    @GetMapping("get/{Id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer Id){
        return quizService.getQuizQuestions(Id);
    }

    @PostMapping("submit/{Id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer Id, @RequestBody List<Response> responses){
        return quizService.calculateResult(Id, responses);
    }
}
