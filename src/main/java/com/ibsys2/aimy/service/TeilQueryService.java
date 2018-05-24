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

import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.TeilRepository;
import com.ibsys2.aimy.service.dto.TeilCriteria;

import com.ibsys2.aimy.domain.enumeration.Teiltyp;

/**
 * Service for executing complex queries for Teil entities in the database.
 * The main input is a {@link TeilCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Teil} or a {@link Page} of {%link Teil} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class TeilQueryService extends QueryService<Teil> {

    private final Logger log = LoggerFactory.getLogger(TeilQueryService.class);


    private final TeilRepository teilRepository;

    public TeilQueryService(TeilRepository teilRepository) {
        this.teilRepository = teilRepository;
    }

    /**
     * Return a {@link List} of {%link Teil} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Teil> findByCriteria(TeilCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Teil> specification = createSpecification(criteria);
        return teilRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Teil} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Teil> findByCriteria(TeilCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Teil> specification = createSpecification(criteria);
        return teilRepository.findAll(specification, page);
    }

    /**
     * Function to convert TeilCriteria to a {@link Specifications}
     */
    private Specifications<Teil> createSpecification(TeilCriteria criteria) {
        Specifications<Teil> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Teil_.id));
            }
            if (criteria.getTeiltyp() != null) {
                specification = specification.and(buildSpecification(criteria.getTeiltyp(), Teil_.teiltyp));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Teil_.periode));
            }
            if (criteria.getNummer() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNummer(), Teil_.nummer));
            }
            if (criteria.getIstmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getIstmenge(), Teil_.istmenge));
            }
            if (criteria.getStartmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStartmenge(), Teil_.startmenge));
            }
            if (criteria.getProzentsatz() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getProzentsatz(), Teil_.prozentsatz));
            }
            if (criteria.getLagerpreis() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLagerpreis(), Teil_.lagerpreis));
            }
            if (criteria.getLagerwert() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLagerwert(), Teil_.lagerwert));
            }
            if (criteria.getSicherheitsbestand() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSicherheitsbestand(), Teil_.sicherheitsbestand));
            }
            if (criteria.getVertriebswunsch() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVertriebswunsch(), Teil_.vertriebswunsch));
            }
            if (criteria.getVertriebswunsch_naechste() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVertriebswunsch_naechste(), Teil_.vertriebswunsch_naechste));
            }
            if (criteria.getVertriebswunsch_uebernaechste() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVertriebswunsch_uebernaechste(), Teil_.vertriebswunsch_uebernaechste));
            }
            if (criteria.getVertriebswunsch_ueberuebernaechste() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVertriebswunsch_ueberuebernaechste(), Teil_.vertriebswunsch_ueberuebernaechste));
            }
            if (criteria.getGesamtproduktionsmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getGesamtproduktionsmenge(), Teil_.gesamtproduktionsmenge));
            }
            if (criteria.getDirektverkaufmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDirektverkaufmenge(), Teil_.direktverkaufmenge));
            }
            if (criteria.getDirektverkaufspreis() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDirektverkaufspreis(), Teil_.direktverkaufspreis));
            }
            if (criteria.getStrafe() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStrafe(), Teil_.strafe));
            }
            if (criteria.getWarteliste_menge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getWarteliste_menge(), Teil_.warteliste_menge));
            }
            if (criteria.getInBearbeitung_menge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getInBearbeitung_menge(), Teil_.inBearbeitung_menge));
            }
        }
        return specification;
    }

}
