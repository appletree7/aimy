package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.TeilService;
import com.ibsys2.aimy.domain.Teil;
import com.ibsys2.aimy.repository.TeilRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Teil.
 */
@Service
@Transactional
public class TeilServiceImpl implements TeilService{

    private final Logger log = LoggerFactory.getLogger(TeilServiceImpl.class);

    private final TeilRepository teilRepository;

    public TeilServiceImpl(TeilRepository teilRepository) {
        this.teilRepository = teilRepository;
    }

    /**
     * Save a teil.
     *
     * @param teil the entity to save
     * @return the persisted entity
     */
    @Override
    public Teil save(Teil teil) {
        log.debug("Request to save Teil : {}", teil);
        return teilRepository.save(teil);
    }

    /**
     *  Get all the teils.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Teil> findAll(Pageable pageable) {
        log.debug("Request to get all Teils");
        return teilRepository.findAll(pageable);
    }

    /**
     *  Get one teil by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Teil findOne(Long id) {
        log.debug("Request to get Teil : {}", id);
        return teilRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  teil by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teil : {}", id);
        teilRepository.delete(id);
    }
}
