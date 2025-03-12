package com.zephyra.question_service.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import com.zephyra.*;
import com.zephyra.question_service.DTO.QuestionWrapper;
import com.zephyra.question_service.Model.Question;
import com.zephyra.question_service.Model.Response;
import com.zephyra.question_service.Repository.QuestionRepository;

@Service
public class QuestionService {

        @Autowired
        QuestionRepository questionRepository;

        public ResponseEntity<List<Question>> getAllQuestions(){
            try{
                return new ResponseEntity<>(questionRepository.findAll(), HttpStatus.OK);
            }catch(Exception e){
                e.printStackTrace();
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }

        public ResponseEntity<List<Question>> getQuestionsByCategory(String category){
            try{
                return new ResponseEntity<>(questionRepository.findByCategory(category), HttpStatus.OK);
            }catch(Exception e){
                e.printStackTrace();
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }

        public ResponseEntity<String> addQuestion(Question question){
            questionRepository.save(question);
            return new ResponseEntity<>("Success!!", HttpStatus.CREATED);
        }

        public ResponseEntity<List<Integer>> getQuestionsForQuiz(String catagoryName, Integer numQuestions){
            List<Integer> questions = questionRepository.findRandomQuestionsByCategory(catagoryName, numQuestions);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        }
        
        public ResponseEntity<List<QuestionWrapper>> getQuestionFromId(List<Integer> questionIds){
            List<QuestionWrapper> wrappers = new ArrayList<>();
            List<Question> questions = new ArrayList<>();

            for(Integer id: questionIds){
                questions.add(questionRepository.findById(id).get());
            }

            for(Question question: questions){
                QuestionWrapper wrapper = new QuestionWrapper();
                wrapper.setId(question.getId());
                wrapper.setQuestionText(question.getQuestionText());
                wrapper.setOption1(question.getOption1());
                wrapper.setOption2(question.getOption2());
                wrapper.setOption3(question.getOption3());
                wrappers.add(wrapper);
            }
            return new ResponseEntity<>(wrappers, HttpStatus.OK);
        }

        public ResponseEntity<Integer> getScore(List<Response> responses){
            int right = 0;
            for(Response response :responses){
                Question question = questionRepository.findById(response.getId()).get();
                if(response.getResponse().equals(question.getCorrectAnswer()))
                    right++;
            }
            return new ResponseEntity<>(right, HttpStatus.OK);
        }
}
