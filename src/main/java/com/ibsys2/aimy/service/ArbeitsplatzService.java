package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Arbeitsplatz;
import java.util.List;

/**
 * Service Interface for managing Arbeitsplatz.
 */
public interface ArbeitsplatzService {

    /**
     * Save a arbeitsplatz.
     *
     * @param arbeitsplatz the entity to save
     * @return the persisted entity
     */
    Arbeitsplatz save(Arbeitsplatz arbeitsplatz);

    /**
     *  Get all the arbeitsplatzs.
     *
     *  @return the list of entities
     */
    List<Arbeitsplatz> findAll();

    /**
     *  Get the "id" arbeitsplatz.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Arbeitsplatz findOne(Long id);

    /**
     *  Delete the "id" arbeitsplatz.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
