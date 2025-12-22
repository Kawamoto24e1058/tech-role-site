package com.techrole.controller;

import com.techrole.service.AdminService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminExportController {

    private final AdminService adminService;

    public AdminExportController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping(value = "/results/csv")
    public ResponseEntity<String> exportCsv() {
        String csv = adminService.exportResultsCsv("anonymous");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=results.csv")
                .contentType(MediaType.TEXT_PLAIN)
                .body(csv);
    }
}
