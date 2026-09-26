package com.stajproject.repository;

import com.stajproject.model.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface WorkItemRepository
        extends JpaRepository<WorkItem, Integer>,
                JpaSpecificationExecutor<WorkItem> {

    List<WorkItem> findByProjectId(Integer projectId);

    List<WorkItem> findByReportId(Integer reportId);
}