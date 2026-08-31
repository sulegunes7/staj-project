package com.stajproject.dto;

public class WeeklyReportDTO {

    private Integer id;
    private Integer projectId;
    private String week;
    private String content;

    public WeeklyReportDTO() {
    }

    public WeeklyReportDTO(Integer id, Integer projectId, String week, String content) {
        this.id = id;
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
