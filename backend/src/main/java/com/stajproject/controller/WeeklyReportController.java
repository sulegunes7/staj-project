package com.stajproject.controller;

import com.stajproject.model.WeeklyReport;
import com.stajproject.service.WeeklyReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weekly-reports")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176"
})
public class WeeklyReportController {

    private final WeeklyReportService weeklyReportService;

    public WeeklyReportController(WeeklyReportService weeklyReportService) {
        this.weeklyReportService = weeklyReportService;
    }

    @GetMapping
    public List<WeeklyReport> getAllReports() {
        return weeklyReportService.getAllReports();
    }

    @PostMapping
    public WeeklyReport createReport(@RequestBody WeeklyReport report) {
        return weeklyReportService.createReport(report);
    }

    @PutMapping("/{id}")
    public WeeklyReport updateReport(
            @PathVariable Integer id,
            @RequestBody WeeklyReport report) {
        return weeklyReportService.updateReport(id, report);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Integer id) {
        weeklyReportService.deleteReport(id);
    }
}