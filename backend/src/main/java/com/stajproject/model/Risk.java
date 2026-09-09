package com.stajproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "risks")
public class Risk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer projectId;

    private Integer workItemId;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String status;

    private String responsible;

    public Risk() {
    }

    public Risk(
            Integer projectId,
            Integer workItemId,
            String title,
            String description,
            String status,
            String responsible) {

        this.projectId = projectId;
        this.workItemId = workItemId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.responsible = responsible;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResponsible() {
        return responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }
}