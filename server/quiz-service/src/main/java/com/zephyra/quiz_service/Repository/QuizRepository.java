package com.zephyra.quiz_service.Repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.zephyra.quiz_service.Model.*;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

}
