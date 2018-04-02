package com.ibsys2.aimy.service.impl;

import com.ibsys2.aimy.service.ModusService;
import com.ibsys2.aimy.domain.Modus;
import com.ibsys2.aimy.repository.ModusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Modus.
 */
@Service
@Transactional
public class ModusServiceImpl implements ModusService{

    private final Logger log = LoggerFactory.getLogger(ModusServiceImpl.class);

    private final ModusRepository modusRepository;

    public ModusServiceImpl(ModusRepository modusRepository) {
        this.modusRepository = modusRepository;
    }

    /**
     * Save a modus.
     *
     * @param modus the entity to save
     * @return the persisted entity
     */
    @Override
    public Modus save(Modus modus) {
        log.debug("Request to save Modus : {}", modus);
        return modusRepository.save(modus);
    }

    /**
     *  Get all the moduses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Modus> findAll(Pageable pageable) {
        log.debug("Request to get all Moduses");
        return modusRepository.findAll(pageable);
    }

    /**
     *  Get one modus by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Modus findOne(Long id) {
        log.debug("Request to get Modus : {}", id);
        return modusRepository.findOne(id);
    }

    /**
     *  Delete the  modus by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Modus : {}", id);
        modusRepository.delete(id);
    }
}
