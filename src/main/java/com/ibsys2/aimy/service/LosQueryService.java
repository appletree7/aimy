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

import com.ibsys2.aimy.domain.Los;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.LosRepository;
import com.ibsys2.aimy.service.dto.LosCriteria;


/**
 * Service for executing complex queries for Los entities in the database.
 * The main input is a {@link LosCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Los} or a {@link Page} of {%link Los} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class LosQueryService extends QueryService<Los> {

    private final Logger log = LoggerFactory.getLogger(LosQueryService.class);


    private final LosRepository losRepository;

    public LosQueryService(LosRepository losRepository) {
        this.losRepository = losRepository;
    }

    /**
     * Return a {@link List} of {%link Los} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Los> findByCriteria(LosCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Los> specification = createSpecification(criteria);
        return losRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Los} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Los> findByCriteria(LosCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Los> specification = createSpecification(criteria);
        return losRepository.findAll(specification, page);
    }

    /**
     * Function to convert LosCriteria to a {@link Specifications}
     */
    private Specifications<Los> createSpecification(LosCriteria criteria) {
        Specifications<Los> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Los_.id));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Los_.periode));
            }
            if (criteria.getNummer() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNummer(), Los_.nummer));
            }
            if (criteria.getMenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMenge(), Los_.menge));
            }
            if (criteria.getDurchlaufzeit() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDurchlaufzeit(), Los_.durchlaufzeit));
            }
            if (criteria.getKosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getKosten(), Los_.kosten));
            }
        }
        return specification;
    }

}
