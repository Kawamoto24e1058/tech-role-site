package com.techrole.repository;

import com.techrole.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {
    Optional<Result> findByStudentId(String studentId);
}
