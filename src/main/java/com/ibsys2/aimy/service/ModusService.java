package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Modus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Modus.
 */
public interface ModusService {

    /**
     * Save a modus.
     *
     * @param modus the entity to save
     * @return the persisted entity
     */
    Modus save(Modus modus);

    /**
     *  Get all the moduses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Modus> findAll(Pageable pageable);

    /**
     *  Get the "id" modus.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Modus findOne(Long id);

    /**
     *  Delete the "id" modus.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
