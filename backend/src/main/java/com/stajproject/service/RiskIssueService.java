package com.stajproject.service;

import com.stajproject.model.RiskIssue;
import com.stajproject.repository.RiskIssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskIssueService {

    private final RiskIssueRepository riskIssueRepository;

    public RiskIssueService(RiskIssueRepository riskIssueRepository) {
        this.riskIssueRepository = riskIssueRepository;
    }

    public List<RiskIssue> getAllRiskIssues() {
        return riskIssueRepository.findAll();
    }

    public List<RiskIssue> getRiskIssuesByProjectId(Integer projectId) {
        return riskIssueRepository.findByProjectId(projectId);
    }

    public List<RiskIssue> getRiskIssuesByReportId(Integer reportId) {
        return riskIssueRepository.findByReportId(reportId);
    }

    public List<RiskIssue> getRiskIssuesByWorkItemId(Integer workItemId) {
        return riskIssueRepository.findByWorkItemId(workItemId);
    }

    public RiskIssue createRiskIssue(RiskIssue riskIssue) {
        return riskIssueRepository.save(riskIssue);
    }

    public RiskIssue updateRiskIssue(Integer id, RiskIssue riskIssue) {
        RiskIssue existingRiskIssue = riskIssueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk issue not found"));

        existingRiskIssue.setProjectId(riskIssue.getProjectId());
        existingRiskIssue.setReportId(riskIssue.getReportId());
        existingRiskIssue.setWorkItemId(riskIssue.getWorkItemId());
        existingRiskIssue.setTitle(riskIssue.getTitle());
        existingRiskIssue.setDescription(riskIssue.getDescription());
        existingRiskIssue.setResponsible(riskIssue.getResponsible());
        existingRiskIssue.setStatus(riskIssue.getStatus());

        return riskIssueRepository.save(existingRiskIssue);
    }

    public void deleteRiskIssue(Integer id) {
        if (!riskIssueRepository.existsById(id)) {
            throw new RuntimeException("Risk issue not found");
        }

        riskIssueRepository.deleteById(id);
    }
}