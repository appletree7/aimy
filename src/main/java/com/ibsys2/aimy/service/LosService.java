package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Los;
import java.util.List;

/**
 * Service Interface for managing Los.
 */
public interface LosService {

    /**
     * Save a los.
     *
     * @param los the entity to save
     * @return the persisted entity
     */
    Los save(Los los);

    /**
     *  Get all the los.
     *
     *  @return the list of entities
     */
    List<Los> findAll();

    /**
     *  Get the "id" los.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Los findOne(Long id);

    /**
     *  Delete the "id" los.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
