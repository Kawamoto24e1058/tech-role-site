package com.techrole.service;

import com.techrole.model.AuditLog;
import com.techrole.model.Result;
import com.techrole.repository.AuditLogRepository;
import com.techrole.repository.ResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final ResultRepository resultRepository;
    private final AuditLogRepository auditLogRepository;

    public AdminService(ResultRepository resultRepository, AuditLogRepository auditLogRepository){
        this.resultRepository = resultRepository; this.auditLogRepository = auditLogRepository;
    }

    public List<Result> listAll(){
        return resultRepository.findAll();
    }

    @Transactional
    public String exportResultsCsv(String performedBy){
        List<Result> results = listAll();
        // simple CSV: studentId,name,created_at,top_role_pct_map
        StringWriter w = new StringWriter();
        w.append("student_id,name,created_at,scores,result\n");
        for(Result r: results){
            String line = String.format("\"%s\",\"%s\",\"%s\",\"%s\",\n",
                    r.getStudentId(), r.getName(), r.getCreatedAt().toString(), escape(r.getScores()));
            w.append(line);
        }
        AuditLog a = new AuditLog();
        a.setAction("EXPORT_RESULTS_CSV");
        a.setPerformedBy(performedBy);
        a.setDetails("count="+results.size());
        auditLogRepository.save(a);
        return w.toString();
    }

    private String escape(String s){
        if(s==null) return "";
        return s.replace("\"","\"\"");
    }
}
