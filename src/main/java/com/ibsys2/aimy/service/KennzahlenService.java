package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Kennzahlen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Kennzahlen.
 */
public interface KennzahlenService {

    /**
     * Save a kennzahlen.
     *
     * @param kennzahlen the entity to save
     * @return the persisted entity
     */
    Kennzahlen save(Kennzahlen kennzahlen);

    /**
     *  Get all the kennzahlens.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Kennzahlen> findAll(Pageable pageable);

    /**
     *  Get the "id" kennzahlen.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Kennzahlen findOne(Long id);

    /**
     *  Delete the "id" kennzahlen.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
