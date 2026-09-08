package com.stajproject.controller;

import com.stajproject.model.WorkItem;
import com.stajproject.service.WorkItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-items")
@CrossOrigin(origins = "http://localhost:5177")
public class WorkItemController {

    private final WorkItemService workItemService;

    public WorkItemController(WorkItemService workItemService) {
        this.workItemService = workItemService;
    }

    @GetMapping
    public List<WorkItem> getAllWorkItems() {
        return workItemService.getAllWorkItems();
    }

    @GetMapping("/project/{projectId}")
    public List<WorkItem> getWorkItemsByProjectId(
            @PathVariable Integer projectId) {
        return workItemService.getWorkItemsByProjectId(projectId);
    }

    @GetMapping("/report/{reportId}")
    public List<WorkItem> getWorkItemsByReportId(
            @PathVariable Integer reportId) {
        return workItemService.getWorkItemsByReportId(reportId);
    }

    @PostMapping
    public WorkItem createWorkItem(@RequestBody WorkItem workItem) {
        return workItemService.createWorkItem(workItem);
    }

    @PutMapping("/{id}")
    public WorkItem updateWorkItem(
            @PathVariable Integer id,
            @RequestBody WorkItem workItem) {
        return workItemService.updateWorkItem(id, workItem);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkItem(@PathVariable Integer id) {
        workItemService.deleteWorkItem(id);
    }
}