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

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import com.ibsys2.aimy.domain.*; // for static metamodels
import com.ibsys2.aimy.repository.FertigungsauftragRepository;
import com.ibsys2.aimy.service.dto.FertigungsauftragCriteria;

import com.ibsys2.aimy.domain.enumeration.Auftragstatus;

/**
 * Service for executing complex queries for Fertigungsauftrag entities in the database.
 * The main input is a {@link FertigungsauftragCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Fertigungsauftrag} or a {@link Page} of {%link Fertigungsauftrag} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class FertigungsauftragQueryService extends QueryService<Fertigungsauftrag> {

    private final Logger log = LoggerFactory.getLogger(FertigungsauftragQueryService.class);


    private final FertigungsauftragRepository fertigungsauftragRepository;

    public FertigungsauftragQueryService(FertigungsauftragRepository fertigungsauftragRepository) {
        this.fertigungsauftragRepository = fertigungsauftragRepository;
    }

    /**
     * Return a {@link List} of {%link Fertigungsauftrag} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Fertigungsauftrag> findByCriteria(FertigungsauftragCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Fertigungsauftrag> specification = createSpecification(criteria);
        return fertigungsauftragRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Fertigungsauftrag} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Fertigungsauftrag> findByCriteria(FertigungsauftragCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Fertigungsauftrag> specification = createSpecification(criteria);
        return fertigungsauftragRepository.findAll(specification, page);
    }

    /**
     * Function to convert FertigungsauftragCriteria to a {@link Specifications}
     */
    private Specifications<Fertigungsauftrag> createSpecification(FertigungsauftragCriteria criteria) {
        Specifications<Fertigungsauftrag> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Fertigungsauftrag_.id));
            }
            if (criteria.getPeriode() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPeriode(), Fertigungsauftrag_.periode));
            }
            if (criteria.getNummer() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNummer(), Fertigungsauftrag_.nummer));
            }
            if (criteria.getAuftragsmenge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAuftragsmenge(), Fertigungsauftrag_.auftragsmenge));
            }
            if (criteria.getKosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getKosten(), Fertigungsauftrag_.kosten));
            }
            if (criteria.getDurchschnittlichestueckkosten() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDurchschnittlichestueckkosten(), Fertigungsauftrag_.durchschnittlichestueckkosten));
            }
            if (criteria.getAuftragsstatus() != null) {
                specification = specification.and(buildSpecification(criteria.getAuftragsstatus(), Fertigungsauftrag_.auftragsstatus));
            }
            if (criteria.getBegonnen() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBegonnen(), Fertigungsauftrag_.begonnen));
            }
            if (criteria.getBeendet() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBeendet(), Fertigungsauftrag_.beendet));
            }
            if (criteria.getDlzminimal() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDlzminimal(), Fertigungsauftrag_.dlzminimal));
            }
            if (criteria.getDlzFaktor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDlzFaktor(), Fertigungsauftrag_.dlzFaktor));
            }
            if (criteria.getBearbeitungszeitmin() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBearbeitungszeitmin(), Fertigungsauftrag_.bearbeitungszeitmin));
            }
            if (criteria.getWarteliste_menge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getWarteliste_menge(), Fertigungsauftrag_.warteliste_menge));
            }
            if (criteria.getInBearbeitung_menge() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getInBearbeitung_menge(), Fertigungsauftrag_.inBearbeitung_menge));
            }
            if (criteria.getHerstellteilId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getHerstellteilId(), Fertigungsauftrag_.herstellteil, Teil_.id));
            }
        }
        return specification;
    }

}
