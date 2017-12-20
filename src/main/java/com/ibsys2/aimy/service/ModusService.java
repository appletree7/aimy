package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Modus;
import java.util.List;

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
     *  @return the list of entities
     */
    List<Modus> findAll();
    /**
     *  Get all the ModusDTO where Bestellung is null.
     *
     *  @return the list of entities
     */
    List<Modus> findAllWhereBestellungIsNull();

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
