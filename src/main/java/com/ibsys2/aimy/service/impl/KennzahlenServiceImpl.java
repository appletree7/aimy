package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.KennzahlenService;
import com.ibsys2.aimy.domain.Kennzahlen;
import com.ibsys2.aimy.repository.KennzahlenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Kennzahlen.
 */
@Service
@Transactional
public class KennzahlenServiceImpl implements KennzahlenService{

    private final Logger log = LoggerFactory.getLogger(KennzahlenServiceImpl.class);

    private final KennzahlenRepository kennzahlenRepository;

    public KennzahlenServiceImpl(KennzahlenRepository kennzahlenRepository) {
        this.kennzahlenRepository = kennzahlenRepository;
    }

    /**
     * Save a kennzahlen.
     *
     * @param kennzahlen the entity to save
     * @return the persisted entity
     */
    @Override
    public Kennzahlen save(Kennzahlen kennzahlen) {
        log.debug("Request to save Kennzahlen : {}", kennzahlen);
        return kennzahlenRepository.save(kennzahlen);
    }

    /**
     *  Get all the kennzahlens.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Kennzahlen> findAll(Pageable pageable) {
        log.debug("Request to get all Kennzahlens");
        return kennzahlenRepository.findAll(pageable);
    }

    /**
     *  Get one kennzahlen by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Kennzahlen findOne(Long id) {
        log.debug("Request to get Kennzahlen : {}", id);
        return kennzahlenRepository.findOne(id);
    }

    /**
     *  Delete the  kennzahlen by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Kennzahlen : {}", id);
        kennzahlenRepository.delete(id);
    }
}
