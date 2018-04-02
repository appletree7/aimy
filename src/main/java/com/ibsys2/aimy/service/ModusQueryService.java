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

import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.ModusRepository;
import com.ibsys2.aimy.service.dto.ModusCriteria;


/**
 * Service for executing complex queries for Modus entities in the database.
 * The main input is a {@link ModusCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Modus} or a {@link Page} of {%link Modus} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class ModusQueryService extends QueryService<Modus> {

    private final Logger log = LoggerFactory.getLogger(ModusQueryService.class);


    private final ModusRepository modusRepository;

    public ModusQueryService(ModusRepository modusRepository) {
        this.modusRepository = modusRepository;
    }

    /**
     * Return a {@link List} of {%link Modus} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Modus> findByCriteria(ModusCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Modus> specification = createSpecification(criteria);
        return modusRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Modus} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Modus> findByCriteria(ModusCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Modus> specification = createSpecification(criteria);
        return modusRepository.findAll(specification, page);
    }

    /**
     * Function to convert ModusCriteria to a {@link Specifications}
     */
    private Specifications<Modus> createSpecification(ModusCriteria criteria) {
        Specifications<Modus> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Modus_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Modus_.name));
            }
            if (criteria.getBearbeitungsfaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBearbeitungsfaktor(), Modus_.bearbeitungsfaktor));
            }
            if (criteria.getBearbeitungsabweichung() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBearbeitungsabweichung(), Modus_.bearbeitungsabweichung));
            }
            if (criteria.getLieferfaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLieferfaktor(), Modus_.lieferfaktor));
            }
            if (criteria.getLieferabweichung() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLieferabweichung(), Modus_.lieferabweichung));
            }
            if (criteria.getMengenfakor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMengenfakor(), Modus_.mengenfakor));
            }
            if (criteria.getMengenabweichung() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMengenabweichung(), Modus_.mengenabweichung));
            }
            if (criteria.getPreisfaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPreisfaktor(), Modus_.preisfaktor));
            }
            if (criteria.getDiskontfaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDiskontfaktor(), Modus_.diskontfaktor));
            }
            if (criteria.getBestellkostenfaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBestellkostenfaktor(), Modus_.bestellkostenfaktor));
            }
        }
        return specification;
    }

}
