package com.stajproject.service;

import com.stajproject.model.WeeklyReport;
import com.stajproject.repository.WeeklyReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeeklyReportService {

    private final WeeklyReportRepository weeklyReportRepository;

    public WeeklyReportService(WeeklyReportRepository weeklyReportRepository) {
        this.weeklyReportRepository = weeklyReportRepository;
    }

    // Tüm raporları listele
    public List<WeeklyReport> getAllReports() {
        return weeklyReportRepository.findAll();
    }

    // Yeni rapor oluştur
    public WeeklyReport createReport(WeeklyReport report) {
        return weeklyReportRepository.save(report);
    }

    // Rapor güncelle
    public WeeklyReport updateReport(Integer id, WeeklyReport report) {
        WeeklyReport existingReport = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Weekly report not found"));

        existingReport.setWeek(report.getWeek());
        existingReport.setContent(report.getContent());

        return weeklyReportRepository.save(existingReport);
    }

    // Rapor sil
    public void deleteReport(Integer id) {
        WeeklyReport existingReport = weeklyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Weekly report not found"));

        weeklyReportRepository.delete(existingReport);
    }
}