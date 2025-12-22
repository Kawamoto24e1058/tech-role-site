package com.techrole.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "result_id")
    private Long resultId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "choice_index")
    private Integer choiceIndex;

    @Column(name = "choice_text")
    private String choiceText;

    @Column(name = "scores")
    private String scores;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getResultId() { return resultId; }
    public void setResultId(Long resultId) { this.resultId = resultId; }
    public Integer getQuestionId() { return questionId; }
    public void setQuestionId(Integer questionId) { this.questionId = questionId; }
    public Integer getChoiceIndex() { return choiceIndex; }
    public void setChoiceIndex(Integer choiceIndex) { this.choiceIndex = choiceIndex; }
    public String getChoiceText() { return choiceText; }
    public void setChoiceText(String choiceText) { this.choiceText = choiceText; }
    public String getScores() { return scores; }
    public void setScores(String scores) { this.scores = scores; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
