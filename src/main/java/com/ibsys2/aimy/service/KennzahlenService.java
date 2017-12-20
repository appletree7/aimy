package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Kennzahlen;
import java.util.List;

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
     *  @return the list of entities
     */
    List<Kennzahlen> findAll();

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
