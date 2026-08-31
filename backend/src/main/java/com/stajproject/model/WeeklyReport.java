package com.stajproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "weekly_reports")
public class WeeklyReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer projectId;

    @Column(nullable = false)
    private String week;

    @Column(length = 2000)
    private String content;

    public WeeklyReport() {
    }

    public WeeklyReport(Integer projectId, String week, String content) {
        this.projectId = projectId;
        this.week = week;
        this.content = content;
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

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}