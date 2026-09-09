package com.stajproject.controller;

import com.stajproject.model.Risk;
import com.stajproject.service.RiskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
@CrossOrigin(origins = "http://localhost:5174")
public class RiskController {

    private final RiskService riskService;

    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @GetMapping
    public List<Risk> getAllRisks() {
        return riskService.getAllRisks();
    }

    @GetMapping("/project/{projectId}")
    public List<Risk> getRisksByProjectId(
            @PathVariable Integer projectId) {
        return riskService.getRisksByProjectId(projectId);
    }

    @GetMapping("/work-item/{workItemId}")
    public List<Risk> getRisksByWorkItemId(
            @PathVariable Integer workItemId) {
        return riskService.getRisksByWorkItemId(workItemId);
    }

    @PostMapping
    public Risk createRisk(@RequestBody Risk risk) {
        return riskService.createRisk(risk);
    }

    @PutMapping("/{id}")
    public Risk updateRisk(
            @PathVariable Integer id,
            @RequestBody Risk risk) {
        return riskService.updateRisk(id, risk);
    }

    @DeleteMapping("/{id}")
    public void deleteRisk(@PathVariable Integer id) {
        riskService.deleteRisk(id);
    }
}