package com.stajproject.controller;

import com.stajproject.model.Project;
import com.stajproject.service.ProjectService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176"
})
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping
public ResponseEntity<Project> createProject(@RequestBody Project project) {

    if (project.getName() == null || project.getName().trim().isEmpty()) {
        return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(projectService.createProject(project));
}
@PutMapping("/{id}")
public ResponseEntity<Project> updateProject(
        @PathVariable Integer id,
        @RequestBody Project project) {

    if (project.getName() == null || project.getName().trim().isEmpty()) {
        return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(projectService.updateProject(id, project));
}

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Integer id) {
        projectService.deleteProject(id);
    }
}