package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Bestellung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Bestellung.
 */
public interface BestellungService {

    /**
     * Save a bestellung.
     *
     * @param bestellung the entity to save
     * @return the persisted entity
     */
    Bestellung save(Bestellung bestellung);

    /**
     *  Get all the bestellungs.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Bestellung> findAll(Pageable pageable);

    /**
     *  Get the "id" bestellung.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Bestellung findOne(Long id);

    /**
     *  Delete the "id" bestellung.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
