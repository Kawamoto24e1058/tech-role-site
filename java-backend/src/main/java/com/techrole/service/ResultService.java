package com.techrole.service;

import com.techrole.dto.ResultRequest;
import com.techrole.model.Answer;
import com.techrole.model.Result;
import com.techrole.repository.AnswerRepository;
import com.techrole.repository.ResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ResultService {
    private final ResultRepository resultRepository;
    private final AnswerRepository answerRepository;

    public ResultService(ResultRepository resultRepository, AnswerRepository answerRepository) {
        this.resultRepository = resultRepository;
        this.answerRepository = answerRepository;
    }

    @Transactional
    public Result saveResult(ResultRequest req){
        Result r = new Result();
        r.setStudentId(req.getStudentId());
        r.setName(req.getName());
        // store scores and result as JSON strings (simple pass-through)
        r.setScores(req.getScores()!=null ? toJson(req.getScores()) : "{}");
        r.setResultJson(req.getResult()!=null ? toJson(req.getResult()) : "[]");
        Result saved = resultRepository.save(r);

        // save answers if provided (map index -> question id)
        List<Answer> savedAnswers = new ArrayList<>();
        List<Integer> answers = req.getAnswers();
        if(answers!=null){
            for(int i=0;i<answers.size();i++){
                Integer choice = answers.get(i);
                if(choice==null) continue;
                Answer a = new Answer();
                a.setResultId(saved.getId());
                a.setQuestionId(i+1);
                a.setChoiceIndex(choice);
                // choiceText and scores left null; front-end can include them if desired
                savedAnswers.add(a);
            }
            answerRepository.saveAll(savedAnswers);
        }
        return saved;
    }

    private String toJson(Object obj){
        try{
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        }catch(Exception e){
            return "null";
        }
    }
}
