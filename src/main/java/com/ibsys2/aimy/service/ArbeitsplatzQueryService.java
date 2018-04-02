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

import com.ibsys2.aimy.domain.Arbeitsplatz;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.ArbeitsplatzRepository;
import com.ibsys2.aimy.service.dto.ArbeitsplatzCriteria;


/**
 * Service for executing complex queries for Arbeitsplatz entities in the database.
 * The main input is a {@link ArbeitsplatzCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Arbeitsplatz} or a {@link Page} of {%link Arbeitsplatz} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class ArbeitsplatzQueryService extends QueryService<Arbeitsplatz> {

    private final Logger log = LoggerFactory.getLogger(ArbeitsplatzQueryService.class);


    private final ArbeitsplatzRepository arbeitsplatzRepository;

    public ArbeitsplatzQueryService(ArbeitsplatzRepository arbeitsplatzRepository) {
        this.arbeitsplatzRepository = arbeitsplatzRepository;
    }

    /**
     * Return a {@link List} of {%link Arbeitsplatz} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Arbeitsplatz> findByCriteria(ArbeitsplatzCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Arbeitsplatz> specification = createSpecification(criteria);
        return arbeitsplatzRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Arbeitsplatz} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Arbeitsplatz> findByCriteria(ArbeitsplatzCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Arbeitsplatz> specification = createSpecification(criteria);
        return arbeitsplatzRepository.findAll(specification, page);
    }

    /**
     * Function to convert ArbeitsplatzCriteria to a {@link Specifications}
     */
    private Specifications<Arbeitsplatz> createSpecification(ArbeitsplatzCriteria criteria) {
        Specifications<Arbeitsplatz> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Arbeitsplatz_.id));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Arbeitsplatz_.periode));
            }
            if (criteria.getNummer() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNummer(), Arbeitsplatz_.nummer));
            }
            if (criteria.getRestzeitbedarf() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRestzeitbedarf(), Arbeitsplatz_.restzeitbedarf));
            }
            if (criteria.getRuestvorgaenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRuestvorgaenge(), Arbeitsplatz_.ruestvorgaenge));
            }
            if (criteria.getLeerzeit() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLeerzeit(), Arbeitsplatz_.leerzeit));
            }
            if (criteria.getLohnleerkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLohnleerkosten(), Arbeitsplatz_.lohnleerkosten));
            }
            if (criteria.getLohnkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLohnkosten(), Arbeitsplatz_.lohnkosten));
            }
            if (criteria.getMaschinenstillstandkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMaschinenstillstandkosten(), Arbeitsplatz_.maschinenstillstandkosten));
            }
            if (criteria.getRestzeitbedarf_in_bearbeitung() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRestzeitbedarf_in_bearbeitung(), Arbeitsplatz_.restzeitbedarf_in_bearbeitung));
            }
            if (criteria.getSchicht() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSchicht(), Arbeitsplatz_.schicht));
            }
            if (criteria.getUeberstunden() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getUeberstunden(), Arbeitsplatz_.ueberstunden));
            }
        }
        return specification;
    }

}
