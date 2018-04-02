package com.ibsys2.aimy.service;

import com.ibsys2.aimy.domain.Teil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Teil> findAll(Pageable pageable);

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
