package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Fertigungsauftrag.
 */
public interface FertigungsauftragService {

    /**
     * Save a fertigungsauftrag.
     *
     * @param fertigungsauftrag the entity to save
     * @return the persisted entity
     */
    Fertigungsauftrag save(Fertigungsauftrag fertigungsauftrag);

    /**
     *  Get all the fertigungsauftrags.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Fertigungsauftrag> findAll(Pageable pageable);

    /**
     *  Get the "id" fertigungsauftrag.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Fertigungsauftrag findOne(Long id);

    /**
     *  Delete the "id" fertigungsauftrag.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
