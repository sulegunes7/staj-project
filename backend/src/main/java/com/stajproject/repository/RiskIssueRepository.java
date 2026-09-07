package com.stajproject.repository;

import com.stajproject.model.RiskIssue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiskIssueRepository extends JpaRepository<RiskIssue, Integer> {

    List<RiskIssue> findByProjectId(Integer projectId);

    List<RiskIssue> findByReportId(Integer reportId);

    List<RiskIssue> findByWorkItemId(Integer workItemId);
}