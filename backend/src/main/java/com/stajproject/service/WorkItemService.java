package com.stajproject.service;

import com.stajproject.model.WorkItem;
import com.stajproject.repository.WorkItemRepository;
import com.stajproject.specification.WorkItemSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkItemService {

    private final WorkItemRepository workItemRepository;

    public WorkItemService(WorkItemRepository workItemRepository) {
        this.workItemRepository = workItemRepository;
    }

    public List<WorkItem> getAllWorkItems() {
        return workItemRepository.findAll();
    }

    public List<WorkItem> getFilteredWorkItems(
            Integer projectId,
            Integer reportId,
            String status,
            String responsible,
            Boolean overdue,
            Boolean risk) {

        Specification<WorkItem> specification = Specification
                .where(WorkItemSpecification.hasProjectId(projectId))
                .and(WorkItemSpecification.hasReportId(reportId))
                .and(WorkItemSpecification.hasStatus(status))
                .and(WorkItemSpecification.hasResponsible(responsible))
                .and(WorkItemSpecification.isOverdue(overdue))
                .and(WorkItemSpecification.hasRisk(risk));

        return workItemRepository.findAll(specification);
    }

    public Page<WorkItem> getFilteredWorkItemsPaged(
            Integer projectId,
            Integer reportId,
            String status,
            String responsible,
            Boolean overdue,
            Boolean risk,
            Pageable pageable) {

        Specification<WorkItem> specification = Specification
                .where(WorkItemSpecification.hasProjectId(projectId))
                .and(WorkItemSpecification.hasReportId(reportId))
                .and(WorkItemSpecification.hasStatus(status))
                .and(WorkItemSpecification.hasResponsible(responsible))
                .and(WorkItemSpecification.isOverdue(overdue))
                .and(WorkItemSpecification.hasRisk(risk));

        return workItemRepository.findAll(specification, pageable);
    }

    public List<WorkItem> getWorkItemsByProjectId(Integer projectId) {
        return workItemRepository.findByProjectId(projectId);
    }

    public List<WorkItem> getWorkItemsByReportId(Integer reportId) {
        return workItemRepository.findByReportId(reportId);
    }

    public WorkItem createWorkItem(WorkItem workItem) {
        return workItemRepository.save(workItem);
    }

    public WorkItem updateWorkItem(Integer id, WorkItem workItem) {
        WorkItem existingWorkItem = workItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work item not found"));

        existingWorkItem.setProjectId(workItem.getProjectId());
        existingWorkItem.setReportId(workItem.getReportId());
        existingWorkItem.setTitle(workItem.getTitle());
        existingWorkItem.setDescription(workItem.getDescription());
        existingWorkItem.setResponsible(workItem.getResponsible());
        existingWorkItem.setStatus(workItem.getStatus());
        existingWorkItem.setDueDate(workItem.getDueDate());

        return workItemRepository.save(existingWorkItem);
    }

    public void deleteWorkItem(Integer id) {
        if (!workItemRepository.existsById(id)) {
            throw new RuntimeException("Work item not found");
        }

        workItemRepository.deleteById(id);
    }
}