package com.stajproject.controller;

import com.stajproject.model.WorkItem;
import com.stajproject.service.WorkItemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-items")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5176",
    "http://localhost:5177"
})
public class WorkItemController {

    private final WorkItemService workItemService;

    public WorkItemController(WorkItemService workItemService) {
        this.workItemService = workItemService;
    }

    @GetMapping
    public List<WorkItem> getAllWorkItems(
            @RequestParam(required = false) Integer projectId,
            @RequestParam(required = false) Integer reportId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String responsible,
            @RequestParam(required = false) Boolean overdue,
            @RequestParam(required = false) Boolean risk) {

        return workItemService.getFilteredWorkItems(
                projectId,
                reportId,
                status,
                responsible,
                overdue,
                risk
        );
    }

    @GetMapping("/paged")
    public Page<WorkItem> getPagedWorkItems(
            @RequestParam(required = false) Integer projectId,
            @RequestParam(required = false) Integer reportId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String responsible,
            @RequestParam(required = false) Boolean overdue,
            @RequestParam(required = false) Boolean risk,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("desc")
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );

        return workItemService.getFilteredWorkItemsPaged(
                projectId,
                reportId,
                status,
                responsible,
                overdue,
                risk,
                pageable
        );
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
    public ResponseEntity<WorkItem> createWorkItem(
            @RequestBody WorkItem workItem) {

        if (workItem.getProjectId() == null ||
            workItem.getTitle() == null ||
            workItem.getTitle().trim().isEmpty() ||
            workItem.getStatus() == null ||
            workItem.getStatus().trim().isEmpty()) {

            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(
                workItemService.createWorkItem(workItem)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkItem> updateWorkItem(
            @PathVariable Integer id,
            @RequestBody WorkItem workItem) {

        if (workItem.getProjectId() == null ||
            workItem.getTitle() == null ||
            workItem.getTitle().trim().isEmpty() ||
            workItem.getStatus() == null ||
            workItem.getStatus().trim().isEmpty()) {

            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(
                workItemService.updateWorkItem(id, workItem)
        );
    }

    @DeleteMapping("/{id}")
    public void deleteWorkItem(@PathVariable Integer id) {
        workItemService.deleteWorkItem(id);
    }
}