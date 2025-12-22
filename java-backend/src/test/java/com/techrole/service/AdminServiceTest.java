package com.techrole.service;

import com.techrole.model.AuditLog;
import com.techrole.model.Result;
import com.techrole.repository.AuditLogRepository;
import com.techrole.repository.ResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(AdminService.class)
public class AdminServiceTest {

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Autowired
    AdminService adminService;

    @Test
    public void exportCreatesAuditAndCsv(){
        Result r = new Result();
        r.setStudentId("20201234");
        r.setName("太郎 テスト");
        r.setScores("{\"司令係\": 0.7}");
        resultRepository.save(r);

        String csv = adminService.exportResultsCsv("admin@andrew.ac.jp");
        assertThat(csv).contains("20201234");
        assertThat(csv).contains("太郎 テスト");

        Iterable<AuditLog> logs = auditLogRepository.findAll();
        assertThat(logs).anyMatch(l -> l.getAction().equals("EXPORT_RESULTS_CSV") && l.getPerformedBy().equals("admin@andrew.ac.jp"));
    }
}
