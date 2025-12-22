package com.techrole.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

public class ResultRequest {
    @NotBlank
    private String studentId;
    @NotBlank
    private String name;
    @NotNull
    private List<Integer> answers; // index per question (optional)
    private Map<String,Object> scores; // optional, pass-through
    private Object result; // pass-through (JSONable)

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }
    public Map<String, Object> getScores() { return scores; }
    public void setScores(Map<String, Object> scores) { this.scores = scores; }
    public Object getResult() { return result; }
    public void setResult(Object result) { this.result = result; }
}
