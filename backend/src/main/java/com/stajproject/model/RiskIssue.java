package com.stajproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "risk_issues")
public class RiskIssue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer projectId;

    private Integer reportId;

    private Integer workItemId;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String responsible;

    @Column(nullable = false)
    private String status;

    public RiskIssue() {
    }

    public RiskIssue(
            Integer projectId,
            Integer reportId,
            Integer workItemId,
            String title,
            String description,
            String responsible,
            String status) {

        this.projectId = projectId;
        this.reportId = reportId;
        this.workItemId = workItemId;
        this.title = title;
        this.description = description;
        this.responsible = responsible;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public Integer getWorkItemId() {
        return workItemId;
    }

    public void setWorkItemId(Integer workItemId) {
        this.workItemId = workItemId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResponsible() {
        return responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}