package com.stajproject.specification;

import com.stajproject.model.Risk;
import com.stajproject.model.WorkItem;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class WorkItemSpecification {

    public static Specification<WorkItem> hasProjectId(Integer projectId) {
        return (root, query, criteriaBuilder) ->
                projectId == null
                        ? null
                        : criteriaBuilder.equal(
                                root.get("projectId"),
                                projectId
                        );
    }

    public static Specification<WorkItem> hasReportId(Integer reportId) {
        return (root, query, criteriaBuilder) ->
                reportId == null
                        ? null
                        : criteriaBuilder.equal(
                                root.get("reportId"),
                                reportId
                        );
    }

    public static Specification<WorkItem> hasStatus(String status) {
        return (root, query, criteriaBuilder) ->
                status == null || status.trim().isEmpty()
                        ? null
                        : criteriaBuilder.equal(
                                root.get("status"),
                                status
                        );
    }

    public static Specification<WorkItem> hasResponsible(String responsible) {
        return (root, query, criteriaBuilder) ->
                responsible == null || responsible.trim().isEmpty()
                        ? null
                        : criteriaBuilder.equal(
                                root.get("responsible"),
                                responsible
                        );
    }

    public static Specification<WorkItem> isOverdue(Boolean overdue) {
        return (root, query, criteriaBuilder) -> {

            if (overdue == null) {
                return null;
            }

            LocalDate today = LocalDate.now();

            if (overdue) {
                return criteriaBuilder.lessThan(
                        root.get("dueDate"),
                        today
                );
            }

            return criteriaBuilder.greaterThanOrEqualTo(
                    root.get("dueDate"),
                    today
            );
        };
    }

    public static Specification<WorkItem> hasRisk(Boolean risk) {
        return (root, query, criteriaBuilder) -> {

            if (risk == null) {
                return null;
            }

            Subquery<Integer> subquery =
                    query.subquery(Integer.class);

            var riskRoot = subquery.from(Risk.class);

            subquery.select(
                    riskRoot.get("workItemId")
            );

            subquery.where(
                    criteriaBuilder.equal(
                            riskRoot.get("workItemId"),
                            root.get("id")
                    )
            );

            if (risk) {
                return criteriaBuilder.exists(subquery);
            }

            return criteriaBuilder.not(
                    criteriaBuilder.exists(subquery)
            );
        };
    }
}