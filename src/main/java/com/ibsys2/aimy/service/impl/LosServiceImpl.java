package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.LosService;
import com.ibsys2.aimy.domain.Los;
import com.ibsys2.aimy.repository.LosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Los.
 */
@Service
@Transactional
public class LosServiceImpl implements LosService{

    private final Logger log = LoggerFactory.getLogger(LosServiceImpl.class);

    private final LosRepository losRepository;

    public LosServiceImpl(LosRepository losRepository) {
        this.losRepository = losRepository;
    }

    /**
     * Save a los.
     *
     * @param los the entity to save
     * @return the persisted entity
     */
    @Override
    public Los save(Los los) {
        log.debug("Request to save Los : {}", los);
        return losRepository.save(los);
    }

    /**
     *  Get all the los.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Los> findAll(Pageable pageable) {
        log.debug("Request to get all Los");
        return losRepository.findAll(pageable);
    }

    /**
     *  Get one los by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Los findOne(Long id) {
        log.debug("Request to get Los : {}", id);
        return losRepository.findOne(id);
    }

    /**
     *  Delete the  los by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Los : {}", id);
        losRepository.delete(id);
    }
}
