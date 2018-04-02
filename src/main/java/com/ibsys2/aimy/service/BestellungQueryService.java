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

import com.ibsys2.aimy.domain.Bestellung;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.BestellungRepository;
import com.ibsys2.aimy.service.dto.BestellungCriteria;

import com.ibsys2.aimy.domain.enumeration.Bestellstatus;

/**
 * Service for executing complex queries for Bestellung entities in the database.
 * The main input is a {@link BestellungCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Bestellung} or a {@link Page} of {%link Bestellung} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class BestellungQueryService extends QueryService<Bestellung> {

    private final Logger log = LoggerFactory.getLogger(BestellungQueryService.class);


    private final BestellungRepository bestellungRepository;

    public BestellungQueryService(BestellungRepository bestellungRepository) {
        this.bestellungRepository = bestellungRepository;
    }

    /**
     * Return a {@link List} of {%link Bestellung} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Bestellung> findByCriteria(BestellungCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Bestellung> specification = createSpecification(criteria);
        return bestellungRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Bestellung} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Bestellung> findByCriteria(BestellungCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Bestellung> specification = createSpecification(criteria);
        return bestellungRepository.findAll(specification, page);
    }

    /**
     * Function to convert BestellungCriteria to a {@link Specifications}
     */
    private Specifications<Bestellung> createSpecification(BestellungCriteria criteria) {
        Specifications<Bestellung> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Bestellung_.id));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Bestellung_.periode));
            }
            if (criteria.getNummer() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNummer(), Bestellung_.nummer));
            }
            if (criteria.getLieferzeit() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLieferzeit(), Bestellung_.lieferzeit));
            }
            if (criteria.getKaufmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getKaufmenge(), Bestellung_.kaufmenge));
            }
            if (criteria.getMaterialkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMaterialkosten(), Bestellung_.materialkosten));
            }
            if (criteria.getBestellkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBestellkosten(), Bestellung_.bestellkosten));
            }
            if (criteria.getGesamtkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getGesamtkosten(), Bestellung_.gesamtkosten));
            }
            if (criteria.getStueckkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStueckkosten(), Bestellung_.stueckkosten));
            }
            if (criteria.getBestellstatus() != null) {
                specification = specification.and(buildSpecification(criteria.getBestellstatus(), Bestellung_.bestellstatus));
            }
            if (criteria.getModusId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getModusId(), Bestellung_.modus, Modus_.id));
            }
            if (criteria.getKaufteilId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getKaufteilId(), Bestellung_.kaufteil, Teil_.id));
            }
        }
        return specification;
    }

}
