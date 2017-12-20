package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Teil;
import java.util.List;

/**
 * Service Interface for managing Teil.
 */
public interface TeilService {

    /**
     * Save a teil.
     *
     * @param teil the entity to save
     * @return the persisted entity
     */
    Teil save(Teil teil);

    /**
     *  Get all the teils.
     *
     *  @return the list of entities
     */
    List<Teil> findAll();

    /**
     *  Get the "id" teil.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Teil findOne(Long id);

    /**
     *  Delete the "id" teil.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
