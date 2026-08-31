package com.stajproject.repository;

import com.stajproject.model.WeeklyReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyReportRepository extends JpaRepository<WeeklyReport, Integer> {
}