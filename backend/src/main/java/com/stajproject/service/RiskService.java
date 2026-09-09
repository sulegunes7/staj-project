package com.stajproject.service;

import com.stajproject.model.Risk;
import com.stajproject.repository.RiskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskService {

    private final RiskRepository riskRepository;

    public RiskService(RiskRepository riskRepository) {
        this.riskRepository = riskRepository;
    }

    public List<Risk> getAllRisks() {
        return riskRepository.findAll();
    }

    public List<Risk> getRisksByProjectId(Integer projectId) {
        return riskRepository.findByProjectId(projectId);
    }

    public List<Risk> getRisksByWorkItemId(Integer workItemId) {
        return riskRepository.findByWorkItemId(workItemId);
    }

    public Risk createRisk(Risk risk) {
        return riskRepository.save(risk);
    }

    public Risk updateRisk(Integer id, Risk risk) {
        Risk existingRisk = riskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found"));

        existingRisk.setProjectId(risk.getProjectId());
        existingRisk.setWorkItemId(risk.getWorkItemId());
        existingRisk.setTitle(risk.getTitle());
        existingRisk.setDescription(risk.getDescription());
        existingRisk.setStatus(risk.getStatus());
        existingRisk.setResponsible(risk.getResponsible());

        return riskRepository.save(existingRisk);
    }

    public void deleteRisk(Integer id) {
        if (!riskRepository.existsById(id)) {
            throw new RuntimeException("Risk not found");
        }

        riskRepository.deleteById(id);
    }
}