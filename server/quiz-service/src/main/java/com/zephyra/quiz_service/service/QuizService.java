package com.zephyra.quiz_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.zephyra.quiz_service.DTO.QuestionWrapper;
import com.zephyra.quiz_service.Model.Quiz;
import com.zephyra.quiz_service.Model.Response;
import com.zephyra.quiz_service.Repository.QuizRepository;
import com.zephyra.quiz_service.feign.QuizInterface;
import java.util.*;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuizInterface quizInterface;
    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {  
        List<Integer> questions = quizInterface.getQuestionsForQuiz(category, numQ).getBody();
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionIds(questions);
        quizRepository.save(quiz);
        return new ResponseEntity<>("Successs", HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer Id) {
        Quiz quiz = quizRepository.findById(Id).get();
        List<Integer> questionIds = quiz.getQuestionIds();
        ResponseEntity<List<QuestionWrapper>> questions = quizInterface.getQuestionFromId(questionIds);
        return questions;
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses){
        ResponseEntity<Integer> score = quizInterface.getScore(responses);
        return score;
    }
}
