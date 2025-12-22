package com.techrole.controller;

import com.techrole.model.Result;
import com.techrole.repository.ResultRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
public class ResultController {
    private final ResultRepository repo;
    private final com.techrole.service.ResultService service;

    public ResultController(ResultRepository repo, com.techrole.service.ResultService service) {
        this.repo = repo;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> createResult(@Valid @RequestBody com.techrole.dto.ResultRequest body) {
        Result saved = service.saveResult(body);
        return ResponseEntity.ok(Map.of("id", saved.getId()));
    }

    @GetMapping
    public ResponseEntity<List<Result>> listResults() {
        List<Result> all = repo.findAll();
        return ResponseEntity.ok(all);
    }
}
