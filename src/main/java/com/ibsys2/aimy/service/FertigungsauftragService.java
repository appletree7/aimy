package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Fertigungsauftrag;
import java.util.List;

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
     *  @return the list of entities
     */
    List<Fertigungsauftrag> findAll();

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
