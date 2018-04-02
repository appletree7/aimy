package com.ibsys2.aimy.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.ibsys2.aimy.domain.Kennzahlen;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.KennzahlenRepository;
import com.ibsys2.aimy.service.dto.KennzahlenCriteria;


/**
 * Service for executing complex queries for Kennzahlen entities in the database.
 * The main input is a {@link KennzahlenCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Kennzahlen} or a {@link Page} of {%link Kennzahlen} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class KennzahlenQueryService extends QueryService<Kennzahlen> {

    private final Logger log = LoggerFactory.getLogger(KennzahlenQueryService.class);


    private final KennzahlenRepository kennzahlenRepository;

    public KennzahlenQueryService(KennzahlenRepository kennzahlenRepository) {
        this.kennzahlenRepository = kennzahlenRepository;
    }

    /**
     * Return a {@link List} of {%link Kennzahlen} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Kennzahlen> findByCriteria(KennzahlenCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Kennzahlen> specification = createSpecification(criteria);
        return kennzahlenRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Kennzahlen} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Kennzahlen> findByCriteria(KennzahlenCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Kennzahlen> specification = createSpecification(criteria);
        return kennzahlenRepository.findAll(specification, page);
    }

    /**
     * Function to convert KennzahlenCriteria to a {@link Specifications}
     */
    private Specifications<Kennzahlen> createSpecification(KennzahlenCriteria criteria) {
        Specifications<Kennzahlen> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Kennzahlen_.id));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Kennzahlen_.periode));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Kennzahlen_.name));
            }
            if (criteria.getAktuell() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAktuell(), Kennzahlen_.aktuell));
            }
            if (criteria.getDurchschnitt() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDurchschnitt(), Kennzahlen_.durchschnitt));
            }
            if (criteria.getGesamt() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getGesamt(), Kennzahlen_.gesamt));
            }
        }
        return specification;
    }

}
