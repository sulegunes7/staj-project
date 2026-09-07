package com.stajproject.repository;

import com.stajproject.model.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkItemRepository extends JpaRepository<WorkItem, Integer> {

    List<WorkItem> findByProjectId(Integer projectId);

    List<WorkItem> findByReportId(Integer reportId);
}