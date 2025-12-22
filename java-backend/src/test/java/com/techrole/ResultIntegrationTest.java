package com.techrole;

import com.techrole.dto.ResultRequest;
import com.techrole.model.Result;
import com.techrole.repository.AnswerRepository;
import com.techrole.repository.ResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ResultIntegrationTest {

    @Autowired
    private TestRestTemplate rest;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Test
    public void postResult_savesToDb(){
        ResultRequest req = new ResultRequest();
        req.setStudentId("TEST001");
        req.setName("テスト 太郎");
        req.setAnswers(List.of(1,2,0,3));
        req.setScores(Map.of("commander",2));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ResultRequest> entity = new HttpEntity<>(req, headers);
        ResponseEntity<Map> resp = rest.postForEntity("/api/results", entity, Map.class);
        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
        // check repository
        List<Result> all = resultRepository.findAll();
        assertThat(all).isNotEmpty();
        Result saved = resultRepository.findByStudentId("TEST001").orElse(null);
        assertThat(saved).isNotNull();
        assertThat(answerRepository.findAll()).isNotEmpty();
    }
}
