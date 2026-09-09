package com.stajproject.repository;

import com.stajproject.model.Risk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiskRepository extends JpaRepository<Risk, Integer> {

    List<Risk> findByProjectId(Integer projectId);

    List<Risk> findByWorkItemId(Integer workItemId);
}